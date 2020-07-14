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

    async findNotThenCreate(payload, conditions = ["*"], transaction = null, msg = this.serviceMessageError, attributes = ["*"]) {
        const [response, isCreated] = await this.repository.findNotThenCreate(conditions, attributes, transaction, attributes);

        if (!isCreated) {
            throw new LogicError(msg);
        }

        return response;
    }

    updateOne(payload, id) {
        return this.repository.updateOne(payload, id);
    }

    async upsert(payload, transaction = null, returning = ["*"]) {
            const [record, created] = await this.repository.upsert(payload, transaction, returning);

            return {
                record,
                created,
            };
    }

    softDeleteOne(id) {
        return this.repository.deleteOne(id);
    }
}
