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
        this.productRepository = ProductRepository
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
console.log("====1=====");
console.log(payload);
        const response = await this.repository.create(payload, transaction);
        console.log(response)
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

        const productIdsAvailabel = productsAvailable.map((product) => product.id);

        // eslint-disable-next-line array-callback-return
        cancelOrderDetail = details.filter((detail) => {
            const available = productIdsAvailabel.find((idAvailable) => detail.id === idAvailable);
            if (!available) {
                return detail;
            }

            delete detail.id;

            pendingCreateDetails.push({
                orderId,
                productId: available.id,
                ...detail,
            });
        });

        return [
            pendingCreateDetails,
            cancelOrderDetail,
        ];
    }
}

export default new OrderService();