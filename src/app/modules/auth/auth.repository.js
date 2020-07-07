import CoreRepository from "../../concept/Repository";
import { sequelize, User, UserRole } from "../../../database/models/index";
// import { ROLE } from "../../../constants/role";
// import ServerError from "../../../errors/Server.error";

class TestRepository extends CoreRepository {
    constructor() {
        super(User);
    }

    // async createUserWithUserRole(payload) {
    //     const transaction = await sequelize.transaction();
    //         try {
    //             const modelCreated = await this.create(payload, transaction, ["id"]);
    //             const userRoleRelation = {
    //                 roleId: ROLE.USER,
    //                 userId: modelCreated.get("id"),
    //             };
    //             await UserRole.create(userRoleRelation, { transaction });

    //             transaction.commit();
    //         } catch (error) {
    //             await transaction.rollback();
    //             throw new ServerError("Server is getting error");
    //         }
    // }
}

export default new TestRepository();
