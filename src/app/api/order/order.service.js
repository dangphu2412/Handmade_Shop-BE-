/* eslint-disable no-param-reassign */
import CoreService from "../../concept/Service";
import OrderRepository from "./order.repository";
import OderDetailRepository from "../orderDetail/orderDetail.repository";
import ProductRepository from "../product/product.repository";
import ShopRepository from "../shop/shop.repository";
import database from "../../../database/models";
import FilterDto from "../../resource/filter.dto";

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
        this.shopRepository = ShopRepository;
    }

    async getShopOrders(query, userId) {
        const filter = new FilterDto(query);
        const { key, value, ...prefix } = filter;
        const { id: shopId } = await this.shopRepository.getOne({ userId }, ["getIdOnly"]);
        const conditions = {
            shopId,
        };
        const scopes = ["overview", "getShop", "getOrderDetail", "getUser"];
        switch (key) {
            case orderStatus.PENDING_GOOD:
                conditions.status = orderStatus.PENDING_GOOD;
                break;
            case orderStatus.PENDING_CONFIRM:
                conditions.status = orderStatus.PENDING_CONFIRM;
                break;
            case orderStatus.DELIVERING:
                conditions.status = orderStatus.DELIVERING;
                break;
            case orderStatus.DELIVERED:
                conditions.status = orderStatus.DELIVERED;
                break;
            case orderStatus.CANCEL:
                conditions.status = orderStatus.CANCEL;
                break;
            default:
                break;
        }

        return this.repository.getManyAndCountAll(prefix, scopes, conditions);
    }

    async getUserOrders(query, userId) {
        const filter = new FilterDto(query);
        const { key, value, ...prefix } = filter;
        const conditions = {
            userId,
        };

        const scopes = ["overview", "getShop", "getOrderDetail", "getUser"];
        switch (key) {
            case orderStatus.PENDING_GOOD:
                conditions.status = orderStatus.PENDING_GOOD;
                break;
            case orderStatus.PENDING_CONFIRM:
                conditions.status = orderStatus.PENDING_CONFIRM;
                break;
            case orderStatus.DELIVERING:
                conditions.status = orderStatus.DELIVERING;
                break;
            case orderStatus.DELIVERED:
                conditions.status = orderStatus.DELIVERED;
                break;
            case orderStatus.CANCEL:
                conditions.status = orderStatus.CANCEL;
                break;
            default:
                break;
        }

        return this.repository.getManyAndCountAll(prefix, scopes, conditions);
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

        const orders = orderAvailable.map((order) => {
            const { id, ...data } = order;
            return data;
        });

        await this.oderDetailRepository.customQuery().bulkCreate(orders, transaction);
        await this.updateSoldProducts(orderAvailable, transaction);

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

            pendingCreateDetails.push({
                orderId,
                productId: available.id,
                sold: available.sold,
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
         && status !== orderStatus.PENDING_GOOD
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

        await order.save();
    }

    updateSoldProducts(orders, transaction) {
        const products = orders.map((order) => {
            const data = {
                id: order.id,
                sold: order.sold + order.amount,
            };
            return this.productRepository.updateOne(data, data.id, transaction);
        });
        return Promise.all(products);
    }
}

export default new OrderService();
