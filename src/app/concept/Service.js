import LogicError from '../../errors/Logic.error';

export default class Service {
    repository;

    getMany(query) {
        return this.repository.getMany(query);
    }

    async getOne(id) {
        const result = await this.repository.getOne(id);
        if (!result) {
            throw new LogicError('Can\'t get by this id');
        }
        return result;
    }

    create(payload) {
        return this.repository.create(payload);
    }

    updateOne(payload, id) {
        return this.repository.updateOne(payload, id);
    }

    deleteOne(id) {
        return this.repository.deleteOne(id);
    }

    deleteMultiple(ids) {
        return this.repository.deleteMultiple(ids);
    }
}
