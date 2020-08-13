/* eslint-disable no-param-reassign */
import CoreService from "../../concept/Service";
import OrderRepository from "./order.repository";
import OderDetailRepository from "../orderDetail/orderDetail.repository";
import ProductRepository from "../product/product.repository";
import database from "../../../database/models";
import orderStatus from "../../../constants/enum/order-status.enum";
import LogicError from "../../../errors/Logic.error";
import AuthorizeError from "../../../errors/Authorize.error";
import NotFoundError from "../../../errors/NotFound.error";

class OrderService extends CoreService {
    constructor() {
        super();
        this.repository = OrderRepository;
        this.oderDetailRepository = OderDetailRepository;
        this.productRepository = ProductRepository;
    }

    async getUserOrders(query, userId) {
        const conditions = {
            userId,
        };

        const scopes = ["overview", "getShop", "getOrderDetail"];
        return this.repository.getMany(query, scopes, conditions);
    }

    /**
     *
     * @param {Array} orders
     */
    async createOrders(orders) {
        const transaction = await database.transaction();
        try {
            const response = await Promise.all(
                orders.map((order) => this.createOrder(order)),
            );
            await transaction.commit();

            return response.flat();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async createOrder(order, transaction) {
        const { products, ...payload } = order;

        const response = await this.repository.create(payload, transaction);

        const { id: orderId } = response;
        // Handle products
        const [orderAvailable, orderFailed] = await this.isGoodsHaving(
                orderId, products, transaction,
            );

        await this.oderDetailRepository.customQuery().bulkCreate(orderAvailable, transaction);

        return orderFailed;
    }

    /**
     *
     * @param {Number} orderId
     * @param {Array} details
     * @param {any} transaction
     */
    async isGoodsHaving(orderId, details, transaction) {
        const pendingCreateDetails = [];
        let cancelOrderDetail = [];

        const productIds = details.map((detail) => detail.id);
        const productScopes = ["getDetail", "productInventory"];
        const conditions = {
            id: productIds,
        };

        const productsAvailable = await this.productRepository.getMany(
            { page: 0, amount: null },
            productScopes,
            conditions,
            transaction,
        );

        // eslint-disable-next-line array-callback-return
        cancelOrderDetail = details
        .map((detail) => {
            // eslint-disable-next-line max-len
            const available = productsAvailable.find((productsFound) => detail.id === productsFound.id);
            if (!available) {
                return {
                    restAmount: 0,
                    ...detail,
                };
            }

            if (available.restAmount < detail.amount) {
                return {
                    restAmount: available.restAmount,
                    ...detail,
                };
            }

            delete detail.id;

            pendingCreateDetails.push({
                orderId,
                productId: available.id,
                ...detail,
            });

            return null;
        })
        .filter((cancel) => cancel !== null);

        return [
            pendingCreateDetails,
            cancelOrderDetail,
        ];
    }

    async patchOrderStatus(payload) {
        const { userId, id, status } = payload;
        const scopes = [{
            method: ["getShop", "getIdForeign"],
        }];
        const order = await this.repository.getByPk(id, scopes);

        if (!order) {
            throw new NotFoundError("This order is not exist");
        }

        const isOrderShopkeeper = order.shop && order.shop.userId === userId;

        if (!isOrderShopkeeper) {
            throw new AuthorizeError("You are not shop owner");
        }

        if (status !== orderStatus.PENDING_CONFIRM
         && status !== orderStatus.DELIVERING
         && status !== orderStatus.CANCEL
         && status !== orderStatus.DELIVERED
        ) {
            throw new LogicError("Status update is not valid");
        }

        order.status = status;
        order.updatedAt = new Date().toISOString();

        if (status === orderStatus.DELIVERED) {
            order.receivedAt = new Date().toISOString();
        }
        if (status === orderStatus.CANCEL) {
            order.deletedAt = new Date().toISOString();
        }

        return order.save();
    }
}

export default new OrderService();
