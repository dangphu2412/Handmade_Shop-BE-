import express from 'express';
import testRoute from '../app/modules/test/test.routes';

const router = express.Router();

router.use(testRoute);

export default router;
