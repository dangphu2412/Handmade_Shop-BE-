import CoreRepository from "../../concept/Repository";
import { Models } from "../../../database/models/index";

class GalleryRepository extends CoreRepository {
    constructor() {
        const { Gallery } = Models;
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

        return this.model.bulkCreate(mappingData, {
            transaction,
        });
    }
}

export default new GalleryRepository();
