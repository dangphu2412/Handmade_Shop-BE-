import CoreRepository from "../../concept/Repository";
import { Models } from "../../../database/models/index";
import ServerError from "../../../errors/Server.error";

class ProductRepository extends CoreRepository {
    constructor() {
        const { Product } = Models;
        super(Product);
    }

    _addRelationProductAndMaterial(product, materials, transaction = null) {
        try {
            return product.addMaterials(materials, {
                transaction,
            });
        } catch (error) {
            throw new ServerError("Your materials is not valid");
        }
    }

    _setRelationProductAndMaterial(product, materials, transaction = null) {
        try {
            return product.setMaterials(materials, {
                transaction,
            });
        } catch (error) {
            console.log(error);
            throw new ServerError("Your materials is not valid");
        }
    }
}

export default new ProductRepository();
