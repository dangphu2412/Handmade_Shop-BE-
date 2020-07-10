import CoreRepository from "../../../concept/Repository";
import { City, District } from "../../../../database/models/index";

class CityRepository extends CoreRepository {
    constructor() {
        super(City);
    }

    getDistrictsByCity(id, { page = 1, amount = 10}) {
        return this.model.findAll({
            include: [{
                model: District,
                as: "districts",
                where: {
                    cityId: id,
                },
            }],
            raw: true,
            limit: amount,
            amount: (page - 1) * amount,
        });
    }
}

export default new CityRepository();
