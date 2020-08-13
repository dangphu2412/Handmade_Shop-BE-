import CoreService from "../../concept/Service";
import TransportRepository from "./transport.repository";
import FilterDto from "./dto/filter-dto";
import LogicError from "../../../errors/Logic.error";
import ShopRepository from "../shop/shop.repository";

class TransportService extends CoreService {
    constructor() {
        super();
        this.repository = TransportRepository;
        this.shopRepository = ShopRepository;
    }

    async getTransports(query) {
        const filterDto = new FilterDto(query);

        const { key, value, ...prefix } = filterDto;
        let transports = {};
        const scopes = ["defaultScope"];
        const conditions = {
            status: true,
        };
        switch (key) {
            case "shop":
                {
                    if (!value) {
                        throw new LogicError("Can't let value empty when get by shop");
                    }
                    const shopScopes = ["transports"];
                    const shop = await this.shopRepository.getByPk(value, shopScopes);
                    transports = shop.transports;
                }
                break;
            default:
                transports = await this.repository.getMany(prefix, scopes, conditions);
                break;
        }
        return transports;
    }
}

export default new TransportService();
