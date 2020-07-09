import CoreRepository from "../../concept/Repository";
import { Gallery } from "../../../database/models/index";

class GalleryRepository extends CoreRepository {
    constructor() {
        super(Gallery);
    }
}

export default new GalleryRepository();
