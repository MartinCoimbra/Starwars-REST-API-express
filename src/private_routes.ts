 
import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';

const router = Router();

/* TOKEN */

/* RUTAS */
/* leemos todos los usuarios */
router.get('/users', safe(actions.getUsers));

export default router;
