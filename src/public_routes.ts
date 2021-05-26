import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';
const router = Router();

/*REGISTRO */
router.post('/user', safe(actions.createUser));
/*LOGIN - POST*/
router.post('/login',safe(actions.login))

/* PERSONAJES RUTAS */
/* POST una 1 person  */
router.post('/person', safe(actions.postPerson))
/* Ruta GET para TODOS los persons*/
router.get('/persons', safe(actions.getPostPersons))
/* Ruta get *UNO SOLO* de los personajes */
router.get('/person/:id', safe(actions.getPostPerson))
/* Ruta PUT (UPDATE) *UNO SOLO* de los personajes */
router.put('/person/:id', safe(actions.putPostPerson))
/* Ruta DELETE *UNO SOLO* de los personajes */
router.delete('/person/:id', safe(actions.deletePostPerson))

/* RUTAS PLANETS */
/* Ruta POST 1 planet */
router.post('/planet', safe(actions.postPlanet))
/* Ruta get TODOS los planetas */
router.get('/planets', safe(actions.getPlanets))
/* Ruta get *UNO SOLO* de los planetas */
router.get('/planet/:id', safe(actions.getPlanet))
/* Ruta PUT *UNO SOLO* de los planetas*/
router.put('/planet/:id', safe(actions.putPostPlanet))
/* Ruta DELETE *UNO SOLO* de los planetas */
router.delete('/planet/:id', safe(actions.deletePostPlanet))



export default router;
