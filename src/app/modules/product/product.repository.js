import CoreRepository from "../../concept/Repository";
import { Product, ProductMaterial, ProductTransport, queryInterface } from "../../../database/models/index";

class ProductRepository extends CoreRepository {
    constructor() {
        super(Product);
    }

    createRelationWithMaterial(productId, materialIds, transaction) {
        const mappingData = materialIds.map((materialId) => {
            return {
                productId,
                materialId,
            };
        });
        return ProductMaterial.bulkCreate(mappingData, {
            transaction,
        });
    }

    createRelationWithTransport(productId, transportIds, transaction) {
        const mappingData = transportIds.map((transportId) => {
            return {
                productId,
                transportId,
            };
        });
        return ProductTransport.bulkCreate(mappingData, {
            transaction,
        });
    }
}

export default new ProductRepository();
