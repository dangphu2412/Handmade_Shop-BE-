import ServerError from "../../errors/Server.error";

export default class Repository {
    constructor(model) {
        this.model = model;
        this.serverMessageError = "Server is crashing ! Pleas check your input before calling handling";
    }

    customQuery() {
        return this.model;
    }

    /**
     *
     * @param {Object} query
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
     * @param {any} transaction
     * - Optionals with sql, usually used when having insert or update
     * - It will rollback when sql query is failed
     * - Not required, call from sequelize instance
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

        /**
     *
     * @param {Object} query
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
     * @param {any} transaction
     * - Optionals with sql, usually used when having insert or update
     * - It will rollback when sql query is failed
     * - Not required, call from sequelize instance
     */
    getManyAndCountAll({
        page = 1, amount = 10, order = "createdAt", by = "DESC",
    },
    scope = "defaultScope", where = null, transaction = null) {
    const filterSCope = (scope === "defaultScope") ? scope : [...scope];
    return this.model.scope(filterSCope).findAndCountAll({
        limit: amount,
        amount: (page - 1) * amount,
        order: [[order, by]],
        where,
        transaction,
    });
}

    /**
     *
     * @param {Number} id
     * - Primary key to find
     * @param {Array} scope
     * - Scope is define in model
     * - Example: scope("defaultScope") if not redefine it will get all fields
     * - Model: User -> scope: {
     *  privateUser: {
     *      attributes: ["id", "username", "name", "password", "roleId"],
     *  }
     * }
     * @param {any} transaction
     * - Optionals with sql, usually used when having insert or update
     * - It will rollback when sql query is failed
     * - Not required, call from sequelize instance
     */
    getByPk(id, scope = "defaultScope", transaction = null) {
        return this.model.scope(scope).findByPk(id, {
            transaction,
        });
    }

    /**
     *
     * @param {Object} conditions
     * - Object of conditions
     * - Example:
     * {
     *   id: 2
     *   name: "Jesus"
     * }
     * @param {Array} scope
     * - Scope is define in model
     * - Example: scope("defaultScope") if not redefine it will get all fields
     * - Model: User -> scope: {
     *  privateUser: {
     *      attributes: ["id", "username", "name", "password", "roleId"],
     *  }
     * }
     * @param {any} transaction
     * - Optionals with sql, usually used when having insert or update
     * - It will rollback when sql query is failed
     * - Not required, call from sequelize instance
     */
    getOne(conditions, scope = "defaultScope", transaction = null) {
        return this.model.scope(scope).findOne({
            where: conditions,
            transaction,
        });
    }

    /**
     *
     * @param {Object} payload
     * - Object of data to create
     * - Example:
     * - {
     *  name: "Jesus",
     *  age: 12
     * }
     * @param {any} transaction
     * - Optionals with sql, usually used when having insert or update
     * - It will rollback when sql query is failed
     * - Not required, call from sequelize instance
     * @param {Array} attributes
     * - Array of attributes to be returned
     * - Example: ["id", "name"]
     * @param {Array} include
     * - Option to create relation table
     * - Example: include = ["Shop"]
     * - In payload will contain object like Shop: {}
     */
    async create(payload, transaction = null, attributes = null, include = null) {
        try {
            const response = await this.model.create(payload, {
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

    /**
     *
     * @param {Object} payload
     * - Object of data to create
     * - Example:
     * - {
     *  name: "Jesus",
     *  age: 12
     * }
     * @param {Array} conditions
     * - Object of conditions
     * - Example:
     * {
     *   id: 2
     *   name: "Jesus"
     * }
     * @param {any} transaction
     * - Optionals with sql, usually used when having insert or update
     * - It will rollback when sql query is failed
     * - Not required, call from sequelize instance
     * @param {Array} attributes
     * - Array of attributes to be returned
     * - Example: ["id", "name"]
     */
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

    /**
     *
     * @param {Object} payload
     * - Object of data to create
     * - Example:
     * - {
     *  name: "Jesus",
     *  age: 12
     * }
     * @param {Number} id
     * - Primary key to find
     * @param {any} transaction
     * - Optionals with sql, usually used when having insert or update
     * - It will rollback when sql query is failed
     * - Not required, call from sequelize instance
     * @param {Array} attributes
     * - Array of attributes to be returned
     * - Example: ["id", "name"]
     */
    async updateOne(payload, id, transaction = null, attributes = null) {
        try {
            const response = await this.model.update(payload, {
                where: { id },
                transaction,
                attributes,
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

    /**
     *
     * @param {Number} id
     * - Primary key to find
     * @param {Boolean} status
     * - Status to update
     * @param {any} transaction
     * - Optionals with sql, usually used when having insert or update
     * - It will rollback when sql query is failed
     * - Not required, call from sequelize instance
     * @param {Array} attributes
     * - Array of attributes to be returned
     * - Example: ["id", "name"]
     */
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

    bulkUpdate(items, fieldUpdate = ["id"], transaction = null) {
        try {
            return this.model.bulkCreate(items, {
                updateOnDuplicate: [...fieldUpdate],
                transaction,
            });
        } catch (error) {
            console.log(error);
            throw new ServerError(this.serverMessageError);
        }
    }
}
