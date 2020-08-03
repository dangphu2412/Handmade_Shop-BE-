/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import slugTransfer from "speakingurl";

import CoreService from "../../concept/Service";
import ProductRepository from "./product.repository";
import ShopRepository from "../shop/shop.repository";
import GalleryRepository from "../gallery/gallery.repository";
import NotFoundError from "../../../errors/NotFound.error";
import LogicError from "../../../errors/Logic.error";
import database from "../../../database/models/index";

class ProductService extends CoreService {
    constructor() {
        super();
        this.repository = ProductRepository;
        this.shopRepository = ShopRepository;
        this.galleryRepository = GalleryRepository;
    }

    fetchProductDetail(slug) {
        const conditions = {
            slug,
        };
        const scopes = ["getDetail", "shop", "category", "materials", "transports", "gallery"];
        return this.repository.getOne(conditions, scopes);
    }

    async fetchProductDetailById(id, userId) {
        const scopes = ["category", "materials", "transports", "gallery"];
        const product = await this.repository.getByPk(id, scopes);

        if (!product) {
            throw new NotFoundError("Not found this product");
        }

        const { shopId } = product;
        const authorScopes = ["getIdForeign"];
        const isAuthor = await this.shopRepository.getByPk(shopId, authorScopes);

        if (!isAuthor || userId !== isAuthor.userId) {
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
            // Get first element to thumbnail
            productPayload.thumbnail = productPayload.gallery[0].src;

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
            const { id } = productPayload;

            // Not update slug
            if (productPayload.slug) {
                delete productPayload.slug;
            }

            const [, response] = await this.repository.updateOne(productPayload, id, transaction);

            const productInfo = response[0];

            await this.updateGallery(productInfo, gallery, transaction);
            await this.repository._setRelationProductAndMaterial(productInfo, materialIds, transaction);
            await this.repository._setRelationProductAndTransport(productInfo, transportIds, transaction);
            return transaction.commit();
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            throw error;
        }
    }

    async disableProduct(idProduct, userId) {
        const scopes = ["getIdForeign", "withSoftDelete"];
        const product = await this.repository.getByPk(idProduct, scopes);

        if (!product.status) {
            throw new LogicError("This product is disabled");
        }

        const { shopId } = product;
        const authorScopes = ["getIdForeign"];
        const isAuthor = await this.shopRepository.getByPk(shopId, authorScopes);

        if (!isAuthor || userId !== isAuthor.userId) {
            throw new LogicError("You are not the author of this product");
        }

        product.status = false;
        product.deletedAt = new Date().toISOString();
        return product.save();
    }

    /**
     *
     * @param {Array} gallery
     * @param {any} transaction
     */
    updateGallery(productInfo, gallery, transaction) {
        try {
            const { id: productId } = productInfo;
            const filterBox = {
                deleteItems: [],
                newItems: [],
            };

            gallery.forEach((item) => {
                if (item.id === null) {
                    const newItem = {
                        productId,
                        kind: item.kind,
                        src: item.src,
                    };
                    filterBox.newItems.push({
                        productId,
                        ...newItem,
                    });
                }
                if (item.status === false) {
                    filterBox.deleteItems.push(item);
                }
            });
            return Promise.all([
                this.galleryRepository.customQuery().bulkCreate(filterBox.newItems),
                this.galleryRepository.bulkUpdate(filterBox.deleteItems, ["id", "status"], transaction),
            ]);
        } catch (error) {
            console.log(error);
            throw new LogicError("Update gallery got problem");
        }
    }
}

export default new ProductService();
