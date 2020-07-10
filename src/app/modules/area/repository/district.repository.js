import CoreRepository from "../../../concept/Repository";
import { District } from "../../../../database/models/index";

class DistrictRepository extends CoreRepository {
    constructor() {
        super(District);
    }

    getDistrictsByCityId(id, { page = 1, amount = 10}) {
        return this.model.findAll({
            where: {
                cityId: id,
            },
            raw: true,
            limit: amount,
            amount: (page - 1) * amount,
        });
    }
}

export default new DistrictRepository();
