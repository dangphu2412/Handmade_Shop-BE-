import CoreController from '../../concept/Controller';
import Service from './test.service';

export default class TestController extends CoreController {
    constructor() {
        super();
        this.service = Service.GetTestService();
    }
}
