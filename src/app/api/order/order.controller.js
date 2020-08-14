/* eslint-disable no-param-reassign */
import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import OrderService from "./order.service";
import CreateOrderDto from "./dto/create-order.dto";
import PatchStatusOrderDto from "./dto/patch-order.dto";
import FilterDetailDto from "./dto/filter-order-detail";

import { OrderMessages } from "../../../constants/message";

class OrderController extends CoreController {
    constructor() {
        super();
        this.service = OrderService;
    }

    async getShopOrders(request, response) {
        try {
            const { userId } = this.getCredentialInfo(request);
            const { query } = request;

            const data = await this.service.getShopOrders(query, userId);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Get success",
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async getUserOrders(request, response) {
        try {
            const { userId } = this.getCredentialInfo(request);
            const { query } = request;

            const data = await this.service.getUserOrders(query, userId);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Get success",
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async getOrderDetail(request, response) {
        try {
            const { userId } = this.getCredentialInfo(request);
            const { params, query } = request;

            const filterDto = new FilterDetailDto(userId, params, query);
            const data = await this.service.getOrderDetail(filterDto);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Get success",
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }


    async createNewOrders(request, response) {
        try {
            const { userId } = this.getCredentialInfo(request);
            const { body } = request;

            const createOrderDto = body.map((order) => {
                order.userId = userId;
                return new CreateOrderDto(order);
            });

            const orderFailed = await this.service.createOrders(createOrderDto);
            const message = (!orderFailed.length) ? OrderMessages.CREATE_SUCCESS : OrderMessages.CREATE_FAILED;
            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message,
                orderFailed,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async patchStatusOrder(request, response) {
        try {
            const { userId } = this.getCredentialInfo(request);
            const { query, params } = request;

            const payload = new PatchStatusOrderDto(userId, params, query);

            await this.service.patchOrderStatus(payload);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Update success",
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new OrderController();
