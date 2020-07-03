import CoreService from '../../concept/Service';
import Repository from './test.repository';

export default class TestService extends CoreService {
    static _instance;

    constructor() {
        super();
        this.repository = Repository.GetTestRepository();
    }

    static GetTestService() {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }
}
