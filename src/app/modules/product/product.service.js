import slugTransfer from "speakingurl";

import CoreService from "../../concept/Service";
import ProductRepository from "./product.repository";
import ServerError from "../../../errors/Server.error";
// eslint-disable-next-line import/named
import { sequelize } from "../../../database/models/index";

class ProductService extends CoreService {
    constructor() {
        super();
        this.repository = ProductRepository;
    }

    async createProduct(payload) {
        const transaction = await sequelize.transaction();

        try {
            const {
                materialIds,
                transportIds,
                ...productPayload
            } = payload;
            let include = ["gallery"];

            productPayload.slug = slugTransfer(productPayload.name);
            productPayload.restAmount = productPayload.amount;
            if (!productPayload.gallery) {
                include = null;
            }

            const productInfo = await this.repository.create(productPayload, transaction, null, include);

            await productInfo.addMaterials(materialIds, { transaction });
            await productInfo.addTransports(transportIds, { transaction });
            transaction.commit();
            return productInfo;
        } catch (error) {
            console.log(error);
            transaction.rollback();
            throw new ServerError("Server is crashing");
        }
    }
}

export default new ProductService();
