/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import slugTransfer from "speakingurl";

import CoreService from "../../concept/Service";
import ProductRepository from "./product.repository";
import ShopRepository from "../shop/shop.repository";
import LogicError from "../../../errors/Logic.error";
import database from "../../../database/models/index";

class ProductService extends CoreService {
    constructor() {
        super();
        this.repository = ProductRepository;
        this.shopRepository = ShopRepository;
    }

    fetchProductDetail(slug) {
        const conditions = {
            slug,
        };
        const scopes = ["category", "materials", "transports", "gallery"];
        return this.repository.getOne(conditions, scopes);
    }

    async fetchProductDetailById(id) {
        const scopes = ["category", "materials", "transports", "gallery"];
        const product = await this.repository.getByPk(id, scopes);

        const { shopId } = product;
        const authorScopes = ["getIdForeign"];
        const isAuthor = await this.shopRepository.getByPk(shopId, authorScopes);

        if (!isAuthor) {
            throw new LogicError("You are not the author of this product");
        }

        return product;
    }

    async createProduct(payload) {
        const transaction = await database.transaction();

        try {
            const {
                materialIds,
                transportIds,
                ...productPayload
            } = payload;
            let include = ["gallery"];
            const date = Date.now();
            productPayload.slug = slugTransfer(productPayload.name + date);
            productPayload.restAmount = productPayload.amount;
            if (!productPayload.gallery) {
                include = null;
            }

            const productInfo = await this.repository.create(productPayload, transaction, null, include);
            await this.repository._addRelationProductAndMaterial(productInfo, materialIds, transaction);
            await this.repository._addRelationProductAndTransport(productInfo, transportIds, transaction);
            await transaction.commit();
            return productInfo;
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            throw error;
        }
    }

    async updateProduct({ gallery, materialIds, transportIds, ...productPayload }) {
        const transaction = await database.transaction();

        try {
            const include = ["gallery"];
            const { id } = productPayload;

            // Not update slug
            if (productPayload.slug) {
                delete productPayload.slug;
            }

            const [, response] = await this.repository.updateOne(productPayload, id, transaction, null, include);

            const productInfo = response[0];

            await this.repository._setRelationProductAndMaterial(productInfo, materialIds, transaction);
            await this.repository._setRelationProductAndTransport(productInfo, transportIds, transaction);
            await transaction.commit();
            return productInfo;
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            throw error;
        }
    }

    async disableProduct(idProduct, userId) {
        const scopes = ["getIdForeign"];
        const product = await this.repository.getByPk(idProduct, scopes);

        const { shopId } = product;
        const authorScopes = ["getIdForeign"];
        const isAuthor = await this.shopRepository.getByPk(shopId, authorScopes);

        if (!isAuthor) {
            throw new LogicError("You are not the author of this product");
        }

        product.status = false;
        product.deletedAt = new Date().toISOString();
        await product.save();
    }
}

export default new ProductService();
