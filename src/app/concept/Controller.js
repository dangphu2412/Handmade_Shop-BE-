export default class Controller {
    service

    getMany(request) {
            const { query } = request;
            return this.service.getMany(query);
    }

    getByIds(request) {
        const { params } = request;
        const { ids } = params;
        return this.service.getByIds(ids);
    }

    getOne(request) {
        const { id } = request.params;
        return this.service.getOne(id);
    }

    create(request) {
        const { payload } = request;
        return this.service.create(payload);
    }

    updateOne(request) {
        const { payload, params } = request;
        const { id } = params;
        return this.service.updateOne(payload, id);
    }

    deleteOne(request) {
        const { id } = request.params;
        return this.service.deleteOne(id);
    }

    deleteMultiple(request) {
        const { ids } = request.payload;
        return this.service.deleteMultiple(ids);
    }

    getCredentialInfo(request) {
        if (request.auth.isAuthenticated) {
          const { id: userId, scope } = request.auth.credentials;
          return { userId, scope };
        }
        return { userId: null, scope: null };
    }
}
