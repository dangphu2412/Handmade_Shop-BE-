import httpStatus from "http-status";

export default class Controller {
    async getMany(request, response) {
        try {
            const { query } = request;
            const data = await this.service.getMany(query);
            return response.json({
                status: httpStatus.OK,
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async getByIds(request, response) {
        try {
            const { params } = request;
            const { ids } = params;
            const data = await this.service.getByIds(ids);
            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async getOne(request, response) {
        try {
            const { id } = request.params;
            const data = await this.service.getOne(id);
            return response.json({
                status: httpStatus.OK,
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async create(request, response) {
        try {
            const { payload } = request;
            await this.service.create(payload);
            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Create success",
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async updateOne(request, response) {
        try {
            const { payload, params } = request;
            const { id } = params;
            await this.service.updateOne(payload, id);
            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Update success",
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async softDeleteOne(request, response) {
        try {
            const { id } = request.params;
            await this.service.softDeleteOne(id);
            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Delete success",
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    getCredentialInfo(request) {
        if (request.auth.isAuthenticated) {
          const { id: userId } = request.auth.credentials;
          return { userId };
        }
        return { userId: null };
    }

    ErrorHandler(response, error) {
        console.log(error);
        if (error.status) {
            return response.status(httpStatus.OK).json({
                message: error.message,
                status: error.status,
            });
        }
        return response.status(httpStatus.OK).json({
            message: error,
            status: httpStatus.INTERNAL_SERVER_ERROR,
        });
    }

    call(handlerMethod) {
        return this[handlerMethod].bind(this);
    }
}
