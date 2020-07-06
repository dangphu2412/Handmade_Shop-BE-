import CoreRepository from '../../concept/Repository';
import { User } from '../../../database/models/index';

class TestRepository extends CoreRepository {
    constructor() {
        super(User);
    }
}

export default new TestRepository();
