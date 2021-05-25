import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';

const router = Router();

// RUTA PUBLICA 

/* Posteamos 1 usuario */
router.post('/user', safe(actions.createUser));

/* Ruta GET para TODOS los persons *(PEOPLE)* - PERSONAJES - */
router.get('/persons', safe(actions.getPostPersons))

/* POST una person  */
router.post('/person', safe(actions.postPerson))


/* Ruta GET para las person *(PEOPLE)* PUBLICA */
/* router.get('/person/:id', safe(actions.getPostPerson)) */




export default router;
