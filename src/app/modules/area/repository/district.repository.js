import CoreRepository from "../../../concept/Repository";
import { District } from "../../../../database/models/index";

class DistrictRepository extends CoreRepository {
    constructor() {
        super(District);
    }
}

export default new DistrictRepository();
