import CoreRepository from "../../../concept/Repository";
import { Models } from "../../../../database/models/index";

class CityRepository extends CoreRepository {
    constructor() {
        const { City } = Models;
        super(City);
    }
}

export default new CityRepository();
