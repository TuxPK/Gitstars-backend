import { Router } from 'express';

import session from './session';
import tag from './tag';

import authMiddleware from '../middlewares/auth';

const routes = new Router();

routes.use('/session', session);
routes.use('/tag', authMiddleware, tag);

export default routes;
