import express from 'express';
import initBase from './config/initBase';

import 'dotenv/config';

const app = express();

initBase(app);

export default app;
