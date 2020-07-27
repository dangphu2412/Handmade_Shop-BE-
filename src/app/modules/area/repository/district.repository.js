import CoreRepository from "../../../concept/Repository";
import { Models } from "../../../../database/models/index";

class DistrictRepository extends CoreRepository {
    constructor() {
        const { District } = Models;
        super(District);
    }
}

export default new DistrictRepository();
