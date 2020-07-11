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

    getOne(id, attributes = ["*"]) {
        return this.model.findByPk(id, {
            raw: true,
            attributes,
        });
    }

    getOneWithConditions(conditions, attributes = ["*"]) {
        return this.model.findOne({
            where: conditions,
            raw: true,
            attributes,
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

    async create(payload, transaction = null, returning = ["*"]) {
        try {
            const response = await this.model.create(payload, {
                raw: true,
                transaction,
                returning,
            });
            return response;
        } catch (error) {
            console.log(error);
            throw new ServerError(this.serverMessageError);
        }
    }

    async updateOne(payload, id, transaction = null, returning = ["*"]) {
        try {
            const response = await this.model.update(payload, {
                where: { id },
                transaction,
                returning,
            });
            return response;
        } catch (error) {
            console.log(error);
            throw new ServerError(this.serverMessageError);
        }
    }

    async softDeleteOrActiveOne(id, status = false, transaction = null, returning = ["*"]) {
        try {
            const response = await this.model.update({
                status,
                deletedAt: new Date().toISOString(),
            }, {
                where: {
                    id,
                },
                transaction,
                returning,
            });
            return response;
        } catch (error) {
            console.log(error);
            throw new ServerError(this.serverMessageError);
        }
    }
}
