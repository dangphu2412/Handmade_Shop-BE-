/* eslint-disable no-param-reassign */
import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import OrderService from "./order.service";
import CreateOrderDto from "./dto/create-order.dto";
import { OrderMessages } from "../../../constants/message";

class OrderController extends CoreController {
    constructor() {
        super();
        this.service = OrderService;
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
}

export default new OrderController();
