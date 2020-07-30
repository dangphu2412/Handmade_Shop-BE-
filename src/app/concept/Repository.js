import ServerError from "../../errors/Server.error";

export default class Repository {
    constructor(model) {
        this.model = model;
        this.serverMessageError = "Server is crashing ! Pleas check your input before calling handling";
    }

    /**
     *
     * @param {Object} query.filter
     * - filter = {
     *    page: 0,
     *    amount: 10
     *    order: [["createdAt"]]
     * }
     * @param {String} scope
     * - scope is define in model
     * - Example: scope("defaultScope") if not redefine it will get all fields
     * - Model: User -> scope: {
     *  privateUser: {
     *      attributes: ["id", "username", "name", "password", "roleId"],
     *  }
     * }
     * @param {Object} where
     * - Conditions where
     * - where = {
     *    name: "abc"
     *   }
     * @param transaction
     * - Optionals with sql, usually used when having insert or update
     * - It will rollback when sql query is failed
     */
    getMany({
            page = 1, amount = 10, order = "createdAt", by = "DESC",
        },
        scope = "defaultScope", where = null, transaction = null) {
        const filterSCope = (scope === "defaultScope") ? scope : [...scope];
        return this.model.scope(filterSCope).findAll({
            limit: amount,
            amount: (page - 1) * amount,
            order: [[order, by]],
            where,
            transaction,
        });
    }

    getByPk(id, scope = "defaultScope", transaction = null) {
        return this.model.scope(scope).findByPk(id, {
            transaction,
        });
    }

    getOne(conditions, scope = "defaultScope", transaction = null) {
        return this.model.scope(scope).findOne({
            where: conditions,
            transaction,
        });
    }

    async create(payload, transaction = null, attributes = null, include = null) {
        try {
            const response = await this.model.create(payload, {
                transaction,
                attributes,
                include,
            });
            return response;
        } catch (error) {
            console.log(error);
            throw new ServerError(this.serverMessageError);
        }
    }

    async findNotThenCreate(payload, conditions = null, transaction = null, attributes = null) {
        try {
            const response = await this.model.findOrCreate({
                where: conditions,
                defaults: payload,
                transaction,
                attributes,
            });
            return response;
        } catch (error) {
            console.log(error);
            throw new ServerError(this.serverMessageError);
        }
    }

    async updateOne(payload, id, transaction = null, attributes = null, include = null) {
        try {
            const response = await this.model.update(payload, {
                where: { id },
                transaction,
                attributes,
                include,
                returning: true,
            });
            return response;
        } catch (error) {
            console.log(error);
            throw new ServerError(this.serverMessageError);
        }
    }

    async upsert(payload, transaction = null, attributes = null) {
        try {
            const response = await this.model.upsert(payload, {
                transaction,
                attributes,
            });
            return response;
        } catch (error) {
            console.log(error);
            throw new ServerError(this.serverMessageError);
        }
    }

    async softDeleteOrActiveOne(id, status = false, transaction = null, attributes = null) {
        try {
            const response = await this.model.update({
                status,
                deletedAt: new Date().toISOString(),
            }, {
                where: {
                    id,
                },
                transaction,
                attributes,
            });
            return response;
        } catch (error) {
            console.log(error);
            throw new ServerError(this.serverMessageError);
        }
    }
}
