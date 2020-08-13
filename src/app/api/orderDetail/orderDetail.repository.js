import CoreRepository from "../../concept/Repository";
import { Models } from "../../../database/models/index";

class OrderDetailRepository extends CoreRepository {
    constructor() {
        const { OrderDetail } = Models;
        super(OrderDetail);
    }
}

export default new OrderDetailRepository();
