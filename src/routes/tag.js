import { Router } from 'express';
import create from '../app/controllers/tag/create';
import getAll from '../app/controllers/tag/getAll';
import update from '../app/controllers/tag/update';
import remove from '../app/controllers/tag/remove';

const router = new Router();

router.get('/', getAll);
router.post('/', create);
router.put('/:uuid', update);
router.delete('/:uuid', remove);

export default router;
