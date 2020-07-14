import ServerError from "../../errors/Server.error";

export default class Repository {
    constructor(model) {
        this.model = model;
        this.serverMessageError = "Server is crashing ! Pleas check your input before calling handling";
    }

    getMany({ page = 1, amount = 10 }, where = null, attributes = ["*"]) {
        return this.model.findAll({
            where,
            raw: true,
            attributes,
            limit: amount,
            amount: (page - 1) * amount,
        });
    }

    getOne(id, include = null, attributes = ["*"]) {
        return this.model.findByPk(id, {
            raw: true,
            attributes,
            include,
        });
    }

    getOneWithConditions(conditions, include = null, attributes = ["*"]) {
        return this.model.findOne({
            where: conditions,
            raw: true,
            attributes,
            include,
        });
    }

    getRecursive(alias, attributes = ["*"]) {
        return this.model.findAll({
            attributes,
            include: [{
                attributes,
                model: this.model,
                as: alias,
                nested: true,
            }],
        });
    }

    async create(payload, transaction = null, attributes = ["*"]) {
        try {
            const response = await this.model.create(payload, {
                raw: true,
                transaction,
                attributes,
            });
            return response;
        } catch (error) {
            console.log(error);
            throw new ServerError(this.serverMessageError);
        }
    }

    async findNotThenCreate(payload, conditions = null, transaction = null, attributes = ["*"]) {
        try {
            const response = await this.model.findOrCreate({
                raw: true,
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

    async updateOne(payload, id, transaction = null, attributes = ["*"]) {
        try {
            const response = await this.model.update(payload, {
                where: { id },
                transaction,
                attributes,
            });
            return response;
        } catch (error) {
            console.log(error);
            throw new ServerError(this.serverMessageError);
        }
    }

    async upsert(payload, transaction = null, attributes = ["*"]) {
        try {
            const response = await this.model.upsert(payload, {
                raw: true,
                transaction,
                attributes,
            });
            return response;
        } catch (error) {
            console.log(error);
            throw new ServerError(this.serverMessageError);
        }
    }

    async softDeleteOrActiveOne(id, status = false, transaction = null, attributes = ["*"]) {
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
