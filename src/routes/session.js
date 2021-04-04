import { Router } from 'express';
import login from '../app/controllers/session/login';

const router = new Router();

router.get('/login/:code', login);

export default router;
