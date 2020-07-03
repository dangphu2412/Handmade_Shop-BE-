import express from 'express';
import TestController from './test.controller';

const router = express.Router();
const controller = new TestController();

router.get('/test', controller['getMany'].bind(controller));

export default router;
