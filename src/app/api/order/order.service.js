/* eslint-disable no-param-reassign */
import CoreService from "../../concept/Service";
import OrderRepository from "./order.repository";
import OderDetailRepository from "../orderDetail/orderDetail.repository";
import ProductRepository from "../product/product.repository";
import ShopRepository from "../shop/shop.repository";
import database from "../../../database/models";
import { pagination } from "../../../utils/array";

import FilterDto from "../../resource/filter.dto";
import userEnum from "../../../constants/enum/user.enum";
import orderStatusEnum from "../../../constants/enum/order-status.enum";

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
            case orderStatusEnum.PENDING_GOOD:
                conditions.status = orderStatusEnum.PENDING_GOOD;
                break;
            case orderStatusEnum.PENDING_CONFIRM:
                conditions.status = orderStatusEnum.PENDING_CONFIRM;
                break;
            case orderStatusEnum.DELIVERING:
                conditions.status = orderStatusEnum.DELIVERING;
                break;
            case orderStatusEnum.DELIVERED:
                conditions.status = orderStatusEnum.DELIVERED;
                break;
            case orderStatusEnum.CANCEL:
                conditions.status = orderStatusEnum.CANCEL;
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
            case orderStatusEnum.PENDING_GOOD:
                conditions.status = orderStatusEnum.PENDING_GOOD;
                break;
            case orderStatusEnum.PENDING_CONFIRM:
                conditions.status = orderStatusEnum.PENDING_CONFIRM;
                break;
            case orderStatusEnum.DELIVERING:
                conditions.status = orderStatusEnum.DELIVERING;
                break;
            case orderStatusEnum.DELIVERED:
                conditions.status = orderStatusEnum.DELIVERED;
                break;
            case orderStatusEnum.CANCEL:
                conditions.status = orderStatusEnum.CANCEL;
                break;
            default:
                break;
        }

        return this.repository.getManyAndCountAll(prefix, scopes, conditions);
    }

    async getOrderDetail(filterDto) {
        const { id, userId, key, ...prefix } = filterDto;
        const conditions = {
            id,
        };

        switch (key) {
            case userEnum.CLIENT:
                conditions.userId = userId;
                break;
            case userEnum.MANAGE:
                {
                    const { id: shopId } = await this.shopRepository.getOne(
                        { userId }, ["getIdOnly"],
                    );
                    conditions.shopId = shopId;
                }
                break;
            default:
                break;
        }

        const scopes = ["overview", "getShop", "getOrderDetail", "getUser"];

        const response = await this.repository.getOne(conditions, scopes);

        if (!response) {
            throw new LogicError("You are not author of this order");
        }

        response.dataValues.products = {
            count: response.dataValues.products.length,
            rows: pagination(prefix, response.dataValues.products),
        };
        return response;
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

    async patchorderStatusEnum(payload) {
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

        if (status !== orderStatusEnum.PENDING_CONFIRM
         && status !== orderStatusEnum.PENDING_GOOD
         && status !== orderStatusEnum.DELIVERING
         && status !== orderStatusEnum.CANCEL
         && status !== orderStatusEnum.DELIVERED
        ) {
            throw new LogicError("Status update is not valid");
        }

        order.status = status;
        order.updatedAt = new Date().toISOString();

        if (status === orderStatusEnum.DELIVERED) {
            order.receivedAt = new Date().toISOString();
        }
        if (status === orderStatusEnum.CANCEL) {
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
