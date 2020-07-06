import CoreService from '../../concept/Service';
import Repository from './test.repository';

class TestService extends CoreService {
    constructor() {
        super();
        this.repository = Repository;
    }
}

export default new TestService();
