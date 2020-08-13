import CoreRepository from "../../concept/Repository";
import { Models } from "../../../database/models/index";

class OrderRepository extends CoreRepository {
    constructor() {
        const { Order } = Models;
        super(Order);
    }
}

export default new OrderRepository();
