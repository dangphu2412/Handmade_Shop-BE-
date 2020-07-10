import slugTransfer from "speakingurl";

import CoreService from "../../concept/Service";
import ShopRepository from "./shop.repository";
import ProductRepository from "../product/product.repository";
import ServerError from "../../../errors/Server.error";
import { sequelize } from "../../../database/models/index";

class ShopService extends CoreService {
    constructor() {
        super();
        this.repository = ShopRepository;
        this.productRepository = ProductRepository;
    }

    async createShop(payload) {
        const transaction = await sequelize.transaction();
        try {
            const {
                product,
                ...payloadShop
            } = payload;

            payloadShop.slug = slugTransfer(payloadShop.name);
            console.log("=======1========");
            console.log(payloadShop);
            const shopInfo = await this.repository.create(payloadShop, transaction);
            const { id: shopId } = shopInfo;
            console.log("=======2=========");
            console.log(shopInfo);
            const {
                materialId,
                transportId,
                ...productPayload
            } = product;

            console.log(`========${materialId} and ${transportId}`)
            productPayload.shopId = shopId;
            productPayload.slug = slugTransfer(productPayload.name);
            productPayload.restAmount = productPayload.amount;

            console.log(productPayload);
            const productInfo = await this.productRepository.create(productPayload, transaction);

            const { id: productId } = productInfo;

            console.log(productPayload);
            await this.productRepository.createRelationWithMaterial(productId, materialId, transaction);
            await this.productRepository.createRelationWithTransport(productId, transportId, transaction);

            return shopInfo;
        } catch (error) {
            console.log(error);
            transaction.rollback();
            throw new ServerError("Server is crashing");
        }
    }
}

export default new ShopService();
