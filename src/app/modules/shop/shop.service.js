import CoreService from "../../concept/Service";
import ShopRepository from "./shop.repository";
import AuthRepository from "../auth/auth.repository";
import LogicError from "../../../errors/Logic.error";
import { ROLE } from "../../../constants/role";
import CreateShopDto from "./dto/create-shop-dto";
import database from "../../../database/models";

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

    fetchOwnerProducts({ key, value, ...query }, userId) {
        let response;
        const conditions = { userId };
        let productScopes = ["category", "productInventory"];
        const scopes = [{ method: ["products", productScopes] }];
        switch (key) {
            case "sold-out":
                productScopes = ["category", "productSoldOut"];
                scopes[0].method[1] = productScopes;
                response = this.repository.getMany(query, scopes, conditions);
                break;
            case "inventory":
                response = this.repository.getMany(query, scopes, conditions);
                break;
            case "search":
                {
                    if (!value) {
                        throw new LogicError("Can't let value empty when search");
                    }
                    const searchByName = ["searchByName", value];
                    productScopes = ["category", { method: searchByName }];
                    scopes[0].method[1] = productScopes;
                    response = this.repository.getMany(query, scopes, conditions);
                }
                break;
            default:
                response = this.repository.getMany(query, scopes, conditions);
                break;
        }
        return response;
    }

    fetchProductsByShopSlug({ key, value, ...query }, slug) {
        let response;
        const conditions = { slug };
        let productScopes = ["category", "productInventory"];
        const scopes = [{ method: ["products", productScopes] }];
        switch (key) {
            case "sold-out":
                productScopes = ["category", "productSoldOut"];
                scopes[0].method[1] = productScopes;
                response = this.repository.getMany(query, scopes, conditions);
                break;
            case "inventory":
                response = this.repository.getMany(query, scopes, conditions);
                break;
            case "search":
                {
                    if (!value) {
                        throw new LogicError("Can't let value empty when search");
                    }
                    const searchByName = ["searchByName", value];
                    productScopes = ["category", { method: searchByName }];
                    scopes[0].method[1] = productScopes;
                    response = this.repository.getMany(query, scopes, conditions);
                }
                break;
            default:
                response = this.repository.getMany(query, scopes, conditions);
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

            await this.authRepository.updateOne({
                roleId: ROLE.SHOP_KEEPER.key,
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
