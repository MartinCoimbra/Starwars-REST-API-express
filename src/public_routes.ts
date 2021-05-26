import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';

const router = Router();

// RUTA PUBLICA , cualquiera puede hacer las siguientes acciones.

/*          REGISTRO 
* Posteamos 1 usuario (Registro, publico)*/
router.post('/user', safe(actions.createUser));

/*              LOGIN 
* Nota: Cuando una persona se va iniciar sesion, entra a travez de una ruta publica "/login". 
* Nota: Cuando vas a ingresar datos (login) vas a hacer un post!. 
*/
router.post('/login',safe(actions.login))


/* ********************************************************** */
                    /* PERSONAJES RUTAS */
/* POST una 1 person  */
router.post('/person', safe(actions.postPerson))
/* Ruta GET para TODOS los persons *(PEOPLE)* - PERSONAJES - */
router.get('/persons', safe(actions.getPostPersons))
/* Ruta get *UNO SOLO* de los personajes */
router.get('/person/:id', safe(actions.getPostPerson))
/* Ruta PUT (UPDATE) *UNO SOLO* de los personajes */
router.put('/person/:id', safe(actions.putPostPerson))


/* ********************************************************** */
                    /* RUTAS PLANETS */
/* Ruta POST 1 planet */
router.post('/planet', safe(actions.postPlanet))
/* Ruta get TODOS los planetas */
router.get('/planets', safe(actions.getPlanets))
/* Ruta get *UNO SOLO* de los planetas */
router.get('/planet/:id', safe(actions.getPlanet))
/* Ruta PUT *UNO SOLO* de los planetas*/
router.put('/planet/:id', safe(actions.putPostPlanet))



export default router;
