import LogicError from "../../errors/Logic.error";

export default class Repository {
    constructor(model) {
        this.model = model;
    }

    getMany({ page = 1, amount = 10 }) {
        return this.model.findAll({
            limit: page,
            amount: (page - 1) * amount,
        });
    }

    async getOne(id) {
        const result = await this.model.findByPk(id);
        if (!result) {
            throw new LogicError("Can't get by this id");
        }
        return result;
    }

    create(payload, transaction = null, returning = ["*"], include = null) {
        return this.model.create(payload, {
            transaction,
            returning,
            include,
        });
    }

    updateOne(payload, id, transaction = null) {
        return this.model.update(payload, {
            where: { id },
            transaction,
        });
    }

    deleteOne(id) {
        return this.model.destroy(id);
    }

    deleteMultiple(ids) {
        return this.model.deleteMultiple(ids);
    }
}