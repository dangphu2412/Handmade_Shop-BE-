import CoreController from '../../concept/Controller';
import Service from './test.service';

class TestController extends CoreController {
    constructor() {
        super();
        this.service = Service;
    }
}

export default new TestController();
