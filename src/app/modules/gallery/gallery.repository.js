import CoreRepository from "../../concept/Repository";
import { Gallery } from "../../../database/models/index";

class GalleryRepository extends CoreRepository {
    constructor() {
        super(Gallery);
    }

    createRelationWithGallery(productId, gallery, transaction) {
        const mappingData = gallery.map(item => {
            return {
                kind: item.kind,
                src: item.src,
                productId,
            };
        });

        return this.model.bulkInsert(mappingData, {
            transaction,
        });
    }
}

export default new GalleryRepository();
