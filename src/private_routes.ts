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
    const decoded = jwt.verify(token as string, process.env.JWT_KEY as string)
    req.user = decoded;
    next()
}

/*              ⛔ IMPORTANTE ⛔
* la variable "verifyToken" tiene que ser POSITIVO (True)
* para poder ejecutar una acción
*/

/* RUTAS */
/* leemos todos los usuarios (privado)*/
/* Luego de hacer login vas a poder acceder a esto: */
router.get('/user/:id',verifyToken, safe(actions.getUser));

/* router.get('/user/:id/favoritos',verifyToken, safe(actions.favoritos)); */


export default router;
