import { Router } from 'express';
import getToken from '../app/controllers/github/getToken';

const router = Router();

router.post('/token', getToken);

export default router;
