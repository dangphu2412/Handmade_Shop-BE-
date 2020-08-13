import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import AddressService from "./address.service";
import CreateAddressDto from "./dto/create-address-dto";
import DeleteAddressDto from "./dto/delete-address-dto";

class AddressController extends CoreController {
    constructor() {
        super();
        this.service = AddressService;
    }

    async getAddresses(request, response) {
        try {
            const { query } = request;
            const { userId } = this.getCredentialInfo(request);
            const data = await this.service.getAddresses(query, userId);
            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Get success",
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async createAddress(request, response) {
        try {
            const { userId } = this.getCredentialInfo(request);
            const { body } = request;
            body.userId = userId;
            const payload = new CreateAddressDto(body);
            const data = await this.service.create(payload);
            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Create success",
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async deleteAddress(request, response) {
        try {
            const { userId } = this.getCredentialInfo(request);
            const { id } = request.params;

            const payload = new DeleteAddressDto({ userId, id });
            await this.service.deleteAddress(payload);
            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Delete success",
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new AddressController();
