import CoreService from "../../concept/Service";
import AddressRepository from "./address.repository";
import DistrictRepository from "../area/repository/district.repository";
import LogicError from "../../../errors/Logic.error";

class AddressService extends CoreService {
    constructor() {
        super();
        this.repository = AddressRepository;
        this.districtRepository = DistrictRepository;
    }

    getAddresses(query, userId) {
        // eslint-disable-next-line no-param-reassign
        query.order = "id";
        const districtScopes = {
            method: ["getDistrict", "getCity"],
        };
        const scopes = ["validAddresses", districtScopes];
        const conditions = {
            userId,
        };
        return this.repository.getMany(query, scopes, conditions);
    }

    async create(createAddressDto) {
        const response = await this.repository.create(createAddressDto);
        const plain = response.get({ plain: true });
        const { districtId } = plain;

        const districtScopes = ["getCity"];

        plain.district = await this.districtRepository.getByPk(districtId, districtScopes);

        return plain;
    }

    async deleteAddress(deleteAddressDto) {
        const { userId, id } = deleteAddressDto;

        const response = await this.repository.getByPk(id);

        const { userId: authorAddressId } = response;

        if (authorAddressId !== userId) {
            throw new LogicError("You are not the author of address");
        }
        await this.repository.deleteOne(id);
    }
}

export default new AddressService();
