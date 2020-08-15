import CoreService from "../../concept/Service";
import ProductRepository from "./product.repository";
import ShopRepository from "../shop/shop.repository";
import GalleryRepository from "../gallery/gallery.repository";
import CategoryRepository from "../category/category.repository";
import database from "../../../database/models/index";

import NotFoundError from "../../../errors/NotFound.error";
import LogicError from "../../../errors/Logic.error";
import productEnum from "../../../constants/enum/product.enum";

import FilterDto from "./dto/filter.dto";
import CreateProductDto from "./dto/create-product-dto";
import UpdateProductDto from "./dto/update-product-dto";

import { pagination } from "../../../utils/array";

class ProductService extends CoreService {
    constructor() {
        super();
        this.repository = ProductRepository;
        this.shopRepository = ShopRepository;
        this.galleryRepository = GalleryRepository;
        this.categoryRepository = CategoryRepository;
    }

    async fetchProducts(query) {
        const filterDto = new FilterDto(query);
        const { key, value, ...prefix } = filterDto;
        let products = {};
        const scopes = ["category", "materials", "gallery"];
        let conditions = {
            status: true,
        };
        switch (key) {
            case productEnum.CATEGORY:
                {
                    conditions = {
                        slug: value,
                    };
                    const categoryScopes = [
                        {
                            method: ["getProducts", scopes],
                        },
                    ];

                    const category = await this.categoryRepository.getOne(
                        conditions, categoryScopes,
                    );
                    products = {
                        count: category.products.length,
                        rows: pagination(query, category.products),
                    };
                }
                break;
            case productEnum.BEST_SELLER:
                scopes.push("getOrderDetails");
                products = await this.getBestSellerProducts(scopes, conditions);
                break;
            case productEnum.SEARCH:
                {
                    if (!value) {
                        throw new LogicError("Can't let value empty when search");
                    }
                    const searchByName = {
                        method: ["searchByName", value],
                    };
                    scopes.push(searchByName);
                    products = await this.repository.getManyAndCountAll(prefix, scopes, conditions);
                }
                break;
            default:
                products = await this.repository.getManyAndCountAll(prefix, scopes);
                break;
        }
        return products;
    }

    fetchProductDetail(slug) {
        const conditions = {
            slug,
        };
        const scopes = ["getDetail", "shop", "category", "materials", "gallery"];
        return this.repository.getOne(conditions, scopes);
    }

    async fetchProductDetailById(id, userId) {
        const scopes = ["category", "materials", "gallery"];
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
        const createProductDto = new CreateProductDto(payload);
        try {
            const { materialIds } = payload;
            let include = ["gallery"];

            if (!createProductDto.gallery.length) {
                include = null;
            }

            const productInfo = await this.repository.create(
                createProductDto, transaction, null, include,
            );

            await this.repository._addRelationProductAndMaterial(
                productInfo, materialIds, transaction,
            );

            await transaction.commit();
            return productInfo;
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            throw error;
        }
    }

    async updateProduct(payload) {
        const transaction = await database.transaction();
        const updateProductDto = new UpdateProductDto(payload);
        const { gallery, materialIds } = payload;
        try {
            const { id } = updateProductDto;

            const [, response] = await this.repository.updateOne(
                updateProductDto, id, transaction,
            );

            const productInfo = response[0];

            await this.updateGallery(productInfo, gallery, transaction);
            await this.repository._setRelationProductAndMaterial(
                productInfo, materialIds, transaction,
            );
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

    async getBestSellerProducts(scopes, conditions) {
        const currentTime = new Date(Date.now());

        const products = await this.repository.getMany(
            { page: 1, amount: null },
            scopes,
            conditions,
        );

        const afterPointedCreatedAt = products.map((product) => {
            const { createdAt } = product;
            const point = this.calPointCreatedAt(createdAt, currentTime);
        });
    }

    calPointCreatedAt(createdAt, currentTime) {
        let point = 0;
        const currentYear = currentTime.getFullYear();
        const currentMonth = currentTime.getMonth();
        const currentDay = currentTime.getDay();
        const currentHour = currentTime.getHour();

        const prodDate = new Date(Date.parse(createdAt));
        const yearLeep = (currentYear - prodDate.getFullYear === 0) ? 50 : 0;
        const monthLeep = this.subAbsThenRound(currentMonth, prodDate.getMonth());
        const dayLeep = this.subAbsThenRound(currentDay, prodDate.getDay());
        const hourLeep = this.subAbsThenRound(currentDay, prodDate.getHours());
        point += ((yearLeep === 0) ? 50 : 0)
        + ((yearLeep === 0) ? monthLeep : 0)
        + ((yearLeep === 0 && monthLeep === 1 && (dayLeep === 1 || dayLeep === 0))
        ? (1 / hourLeep)
        : (dayLeep > 2) ? (1 / hourLeep) * (1 / monthLeep) : 0);
        return point;
    }

    subAbsThenRound(start, end) {
        return Math.round(Math.abs(start - end));
    }
}

export default new ProductService();
