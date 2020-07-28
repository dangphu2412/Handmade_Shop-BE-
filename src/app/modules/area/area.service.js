import CoreService from "../../concept/Service";
import CityRepository from "./repository/city.repository";
import DistrictRepository from "./repository/district.repository";

class AreaService extends CoreService {
    constructor() {
        super();
        this.cityRepository = CityRepository;
        this.districtRepository = DistrictRepository;
    }

    getCities(query) {
        return this.cityRepository.getMany(query);
    }

    getDistrictsByCityId(params, query) {
        const { id } = params;
        const conditions = {
            cityId: id,
        };
        return this.districtRepository.getMany(query, "defaultScope", conditions);
    }
}

export default new AreaService();
