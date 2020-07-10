import slugTransfer from "speakingurl";

import CoreService from "../../concept/Service";
import ProductRepository from "./product.repository";
import GalleryRepository from "../gallery/gallery.repository";
import ServerError from "../../../errors/Server.error";
import { sequelize } from "../../../database/models/index";

class ProductService extends CoreService {
    constructor() {
        super();
        this.repository = ProductRepository;
        this.galleryRepository = GalleryRepository;
    }

    async createProduct(payload) {
        const transaction = await sequelize.transaction();

        try {
            const {
                materialId,
                transportId,
                gallery,
                ...productPayload
            } = payload;

            console.log(`========${materialId} and ${transportId}`)
            productPayload.slug = slugTransfer(productPayload.name);
            productPayload.restAmount = productPayload.amount;

            console.log(productPayload);
            const productInfo = await this.repository.create(productPayload, transaction);

            const { id: productId } = productInfo;

            console.log(productPayload);
            await this.galleryRepository.createRelationWithGallery(productId, gallery, transaction);
            await this.repository.createRelationWithMaterial(productId, materialId, transaction);
            await this.repository.createRelationWithTransport(productId, transportId, transaction);
        } catch (error) {
            transaction.rollback();
            throw new ServerError("Server is crashing");
        }
    }
}

export default new ProductService();
