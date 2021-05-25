/* Recuerda importar todo ⚠ */
import { Router, Request, Response, NextFunction  } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from 'jsonwebtoken'
const router = Router();

/* PARA HACER ESTAS SIGUIENTES RUTAS, necesita ya haber hecho login*/

/* TOKEN */
//MIDDLEWARE de verificación
const verifyToken= (req: Request,res:Response, next:NextFunction) =>{
    //headers con el token
     const token = req.header('Authorization');
    if(!token) return res.status(400).json('ACCESS DENIED');
    try {
        const decoded = jwt.verify(token as string, process.env.JWT_KEY as string)
        /* asignamos a req.user para aceder al usuario */
        req.user = decoded;
        next()      
    } catch (error) {
        /* si surge un error hacemos esto: */
        return res.status(400).json('ACCESS DENIED'); 
    }
  
}

/*              ⛔ IMPORTANTE ⛔
* la variable "verifyToken" tiene que ser POSITIVO (True)
* para poder ejecutar una acción
*/

/* RUTAS */
/* leemos todos los usuarios (privado)*/
/* Luego de hacer login vas a poder acceder a esto: */
/* Leemos el usuario actual namas */
router.get('/user',verifyToken, safe(actions.getUser));

/* NOTA: Todos los datos de aqui son solamente del usuario logeado (recuerda hacer la validacion)*/

/* FAVORITOS (Todos (Planets-Persons)) */
router.get('/user/favoritos',verifyToken, safe(actions.getFavoritos));
/* POST */
router.post('/user/favoritos/planet/:id',verifyToken, safe(actions.addPostPlanetFav));
router.post('/user/favoritos/person/:id',verifyToken, safe(actions.addPostPersonFav));
router.delete('/user/favoritos/planet/:id',verifyToken, safe(actions.deletePostPlanetFav));
router.delete('/user/favoritos/person/:id',verifyToken, safe(actions.deletePostPersonFav));

export default router;
