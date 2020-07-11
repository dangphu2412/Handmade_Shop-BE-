import LogicError from "../../errors/Logic.error";

export default class Service {
    serviceMessageError = "Your input has been created";

    repository;

    getMany(query) {
        return this.repository.getMany(query);
    }

    getRecursive(alias, attributes) {
        return this.repository.getRecursive(alias, attributes);
    }

    async getOne(id) {
        const result = await this.repository.getOne(id);
        if (!result) {
            throw new LogicError("Can't get by this id");
        }
        return result;
    }

    create(payload) {
        return this.repository.create(payload);
    }

    async findNotThenCreate(payload, conditions, msg = this.serviceMessageError, attributes = ["*"]) {
        const found = await this.repository.getOneWithConditions(conditions, attributes);
        if (found) {
            throw new LogicError(msg);
        }
        const response = await this.repository.create(payload);
        return response;
    }

    updateOne(payload, id) {
        return this.repository.updateOne(payload, id);
    }

    softDeleteOne(id) {
        return this.repository.deleteOne(id);
    }
}
