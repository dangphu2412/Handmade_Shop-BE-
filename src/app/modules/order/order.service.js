/* eslint-disable no-param-reassign */
import CoreService from "../../concept/Service";
import OrderRepository from "./order.repository";
import OderDetailRepository from "../orderDetail/orderDetail.repository";
import ProductRepository from "../product/product.repository";
import database from "../../../database/models";

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
        const response = await this.repository.getMany(query, scopes, conditions);

        const shops = [];

        response.forEach(res => {
            const plain = res.get({ plain: true });
            const { totalBillAndShip, shop, details } = plain;
            const isExisted = shops.findIndex(item => item.shop.id === shop.id);

            if (isExisted !== -1) {
                shops[isExisted].products.push(details);
            }
            if (isExisted === -1) {
                shops.push({
                    products: [],
                    totalBillAndShip,
                    shop,
                });
            }
        });

        return shops.map(shop => {
            const { products, ...data } = shop;
            return {
                products: shop.products.flat(),
                ...data,
            };
        });
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
}

export default new OrderService();
