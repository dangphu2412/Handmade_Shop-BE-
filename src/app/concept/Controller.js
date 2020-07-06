import httpStatus from 'http-status';
import LogicError from '../../errors/Logic.error';
import ServerError from '../../errors/Server.error';

export default class Controller {
    service

    async getMany(request, response) {
        try {
            const { query } = request;
            const results = await this.service.getMany(query);
            return response.json({
                status: httpStatus.OK,
                results,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async getByIds(request, response) {
        try {
            const { params } = request;
            const { ids } = params;
            const results = await this.service.getByIds(ids);
            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                results,
            });
        }
        catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async getOne(request, response) {
        try {
            const { id } = request.params;
            const result = await this.service.getOne(id);
            return response.json({
                status: httpStatus.OK,
                result,
            });
        }
        catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async create(request, response) {
        try {
            const { payload } = request;
            await this.service.create(payload);
            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: 'Create success',
            });
        }
        catch (error) {
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
                message: 'Update success',
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async deleteOne(request, response) {
        try {
            const { id } = request.params;
            await this.service.deleteOne(id);
            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: 'Delete success',
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async deleteMultiple(request, response) {
        try {
            const { ids } = request.payload;
            await this.service.deleteMultiple(ids);
            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: 'Delete mutiple success',
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
        if (error instanceof LogicError) {
            return response.status(httpStatus.BAD_REQUEST).json({
                error: error.message,
                status: error.status,
            });
        }

        if (error instanceof ServerError) {
            return response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                error: error.message,
                status: error.status,
            });
        }

        return response.status(httpStatus.BAD_REQUEST).json({
            error: 'Not found',
            status: httpStatus.BAD_REQUEST,
        });
    }

    call(handlerMethod) {
        return this[handlerMethod].bind(this);
    }
}
