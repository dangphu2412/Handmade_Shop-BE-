import ServerError from "../../errors/Server.error";

export default class Repository {
    constructor(model) {
        this.model = model;
    }

    getMany({ page = 1, amount = 10 }) {
        return this.model.findAll({
            raw: true,
            limit: amount,
            amount: (page - 1) * amount,
        });
    }

    getOne(id) {
        return this.model.findByPk(id, {
            raw: true
        });
    }

    async create(payload, transaction = null, returning = ["*"], include = null) {
        try {
            const response = await this.model.create(payload, {
                raw: true,
                transaction,
                returning,
                include,
            });
            return response;
        } catch (error) {
            console.log(error);
            throw new ServerError("Your data is unexcepted");
        }
    }

    updateOne(payload, id, transaction = null) {
        try {
            return this.model.update(payload, {
                where: { id },
                transaction,
            });
        } catch (error) {
            throw new ServerError("Your data is unexcepted");
        }
    }

    deleteOne(id) {
        return this.model.destroy(id);
    }

    deleteMultiple(ids) {
        return this.model.deleteMultiple(ids);
    }

    getRecursive(alias, attributes) {
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
}