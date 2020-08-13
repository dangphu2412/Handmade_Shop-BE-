import CoreService from "../../concept/Service";
import ShopRepository from "./shop.repository";
import AuthRepository from "../auth/auth.repository";
import LogicError from "../../../errors/Logic.error";
import { ROLE } from "../../../constants/role";
import CreateShopDto from "./dto/create-shop-dto";
import database, { Models } from "../../../database/models";
import { pagination } from "../../../utils/array";

const { Role } = Models;

class ShopService extends CoreService {
    constructor() {
        super();
        this.repository = ShopRepository;
        this.authRepository = AuthRepository;
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

    async fetchOwnerProducts({ key, value, ...query }, userId) {
        let response;
        const conditions = { userId };
        let productScopes = ["category", "productInventory"];
        const scopes = [{ method: ["products", productScopes] }];
        switch (key) {
            case "sold-out":
                {
                    productScopes = ["category", "productSoldOut"];
                    scopes[0].method[1] = productScopes;
                    const shop = await this.repository.getOne(conditions, scopes);
                    shop.dataValues.total = shop.products.length;
                    shop.dataValues.products = pagination(query, shop.dataValues.products);
                    response = shop;
                }
                break;
            case "inventory":
                response = await this.repository.getOne(conditions, scopes);
                break;
            case "search":
                {
                    if (!value) {
                        throw new LogicError("Can't let value empty when search");
                    }
                    const searchByName = ["searchByName", value];
                    productScopes = ["category", { method: searchByName }];
                    scopes[0].method[1] = productScopes;
                    const shop = this.repository.getOne(conditions, scopes);
                    shop.dataValues.total = shop.products.length;
                    shop.dataValues.products = pagination(query, shop.dataValues.products);
                    response = shop;
                }
                break;
            default:
                response = this.repository.getOne(conditions, scopes);
                break;
        }
        return response;
    }

    async fetchProductsByShopSlug({ key, value, ...query }, slug) {
        let response;
        const conditions = { slug };
        let productScopes = ["category", "productInventory"];
        const scopes = [{ method: ["products", productScopes] }];
        switch (key) {
            case "sold-out":
                {
                    productScopes = ["category", "productSoldOut"];
                    scopes[0].method[1] = productScopes;
                    const shop = await this.repository.getOne(conditions, scopes);
                    shop.dataValues.products = {
                        count: shop.products.length,
                        rows: pagination(query, shop.dataValues.products),
                    };
                    response = shop;
                }
                break;
            case "inventory":
                {
                    const shop = await this.repository.getOne(conditions, scopes);
                    shop.dataValues.products = {
                        count: shop.products.length,
                        rows: pagination(query, shop.dataValues.products),
                    };
                    response = shop;
                }
                break;
            case "search":
                {
                    if (!value) {
                        throw new LogicError("Can't let value empty when search");
                    }
                    const searchByName = ["searchByName", value];
                    productScopes = ["category", { method: searchByName }];
                    scopes[0].method[1] = productScopes;
                    const shop = await this.repository.getOne(conditions, scopes);
                    shop.dataValues.products = {
                        count: shop.products.length,
                        rows: pagination(query, shop.dataValues.products),
                    };
                    response = shop;
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
