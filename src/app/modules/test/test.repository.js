import CoreRepository from '../../concept/Repository';
import { User } from '../../../database/models/index';

export default class TestRepository extends CoreRepository {
    static _instance;

    constructor() {
        super(User);
    }

    static GetTestRepository() {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }
}
