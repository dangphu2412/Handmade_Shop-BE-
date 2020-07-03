import LogicError from '../../errors/Logic.error';

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
            throw new LogicError('Can\'t get by this id');
        }
        return result;
    }

    create(payload) {
        return this.model.create(payload);
    }

    updateOne(payload, id) {
        return this.model.update(payload, {
            where: { id }
        });
    }

    deleteOne(id) {
        return this.model.destroy(id);
    }

    deleteMultiple(ids) {
        return this.model.deleteMultiple(ids);
    }
}