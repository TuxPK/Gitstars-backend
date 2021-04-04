import { Router } from 'express';

import session from './session';

const routes = new Router();

routes.use('/session', session);

export default routes;
