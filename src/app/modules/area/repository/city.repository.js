import CoreRepository from "../../../concept/Repository";
import { City } from "../../../../database/models/index";

class CityRepository extends CoreRepository {
    constructor() {
        super(City);
    }
}

export default new CityRepository();
