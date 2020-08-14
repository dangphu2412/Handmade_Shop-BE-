import CoreService from "../../concept/Service";
import ShopRepository from "./shop.repository";
import AuthRepository from "../auth/auth.repository";
import ProductRepository from "../product/product.repository";
import CategoryRepository from "../category/category.repository";

import LogicError from "../../../errors/Logic.error";
import CreateShopDto from "./dto/create-shop-dto";
import database, { Models } from "../../../database/models";
import { pagination } from "../../../utils/array";
import { ROLE } from "../../../constants/role";
import FilterDto from "../../resource/filter.dto";
import filterEnum from "../../../constants/enum/filter-search.enum";

const { Role } = Models;

class ShopService extends CoreService {
    constructor() {
        super();
        this.repository = ShopRepository;
        this.authRepository = AuthRepository;
        this.productRepository = ProductRepository;
        this.categoryRepository = CategoryRepository;
    }

    toTransports(shopId, transportIds) {
        return transportIds.map((transportId) => ({
            transportId,
            shopId,
        }));
    }

    async getOwnerShop(userId) {
        const conditions = {
            userId,
        };
        return this.repository.getOne(conditions);
    }

    async fetchOwnerProducts(query, userId) {
        const {
            key, value, filter, ...prefix
        } = new FilterDto(query);

        let response;
        const conditions = { userId };
        const { id: shopId } = await this.repository.getOne(conditions, ["getIdOnly"]);
        const prodConditions = {
            shopId,
        };
        const productScopes = ["category"];

        switch (key) {
            case filterEnum.SOLD_OUT:
                productScopes.push("productSoldOut");
                response = await this.productRepository.getManyAndCountAll(
                    prefix, productScopes, prodConditions,
                );
                break;
            case filterEnum.INVENTORY:
                productScopes.push("productInventory");
                response = await this.productRepository.getManyAndCountAll(
                    prefix, productScopes, prodConditions,
                );
                break;
            case filterEnum.SEARCH:
                {
                    if (!value) {
                        throw new LogicError("Can't let value empty when search");
                    }
                    if (filter === filterEnum.SOLD_OUT) {
                        productScopes.push("productSoldOut");
                    }
                    if (filter === filterEnum.INVENTORY) {
                        productScopes.push("productInventory");
                    }
                    const searchMethod = {
                        method: ["searchByName", value],
                    };
                    productScopes.push(searchMethod);
                    response = await this.productRepository.getManyAndCountAll(
                        prefix, productScopes, prodConditions,
                    );
                }
                break;
            default:
                productScopes.push("productInventory");
                response = await this.productRepository.getManyAndCountAll(
                    prefix, productScopes, prodConditions,
                );
                break;
        }
        return response;
    }

    async fetchProductsByShopSlug({ key, value, ...query }, slug) {
        let response;
        const conditions = { slug };
        const productScopes = ["category", "productInventory"];
        const scopes = [{ method: ["products", productScopes] }];
        switch (key) {
            case "all":
                {
                    const { id: shopId } = await this.repository.getOne(conditions, ["getIdOnly"]);
                    const prodConditions = {
                        shopId,
                    };
                    response = await this.productRepository.getManyAndCountAll(
                        query, productScopes, prodConditions,
                    );
                }
                break;
            case "search":
                {
                    if (!value) {
                        throw new LogicError("Can't let value empty when search");
                    }
                    const { id: shopId } = await this.repository.getOne(conditions, ["getIdOnly"]);
                    const prodConditions = {
                        shopId,
                    };
                    const searchMethod = {
                        method: ["searchByName", value],
                    };
                    productScopes.push(searchMethod);
                    response = await this.productRepository.getManyAndCountAll(
                        query, productScopes, prodConditions,
                    );
                }
                break;
            case "category":
                {
                    if (!value) {
                        throw new LogicError("Can't let value empty when search");
                    }
                    const { id: shopId } = await this.repository.getOne(conditions, ["getIdOnly"]);
                    const prodConditions = {
                        shopId,
                        categoryId: value,
                    };
                    response = await this.productRepository.getManyAndCountAll(
                        query, productScopes, prodConditions,
                    );
                }
                break;
            default:
                {
                    const shop = await this.repository.getOne(conditions, scopes);
                    shop.dataValues.products = {
                        count: shop.products.length,
                        rows: pagination(query, shop.dataValues.products),
                    };
                    response = shop;
                }
                break;
        }
        return response;
    }

    async createShop(payload) {
        const transaction = await database.transaction();
        try {
            const createShopDto = new CreateShopDto(payload);
            const { transportIds } = payload;
            const { userId } = createShopDto;

            const isExist = await this.authRepository.getByPk(userId, "defaultScope", transaction);

            if (isExist.shopActive) {
                throw new LogicError("Shop has been created");
            }

            const response = await this.repository.create(createShopDto, transaction);

            await this.repository._addRelationShopAndTransport(
                response, transportIds, transaction,
            );

            const { id: roleId } = await Role.findOne({
                where: {
                    rolename: ROLE.SHOP_KEEPER,
                },
            });
            await this.authRepository.updateOne({
                roleId,
                shopActive: true,
            }, userId, transaction);

            await transaction.commit();

            return response;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

export default new ShopService();
