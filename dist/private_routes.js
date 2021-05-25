"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* Recuerda importar todo ⚠ */
var express_1 = require("express");
var utils_1 = require("./utils");
var actions = __importStar(require("./actions"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var router = express_1.Router();
/* PARA HACER ESTAS SIGUIENTES RUTAS, necesita ya haber hecho login*/
/* TOKEN */
//MIDDLEWARE de verificación
var verifyToken = function (req, res, next) {
    //headers con el token
    var token = req.header('Authorization');
    if (!token)
        return res.status(400).json('ACCESS DENIED');
    var decoded = jsonwebtoken_1["default"].verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
};
/*              ⛔ IMPORTANTE ⛔
* la variable "verifyToken" tiene que ser POSITIVO (True)
* para poder ejecutar una acción
*/
/* RUTAS */
/* leemos todos los usuarios (privado)*/
/* Luego de hacer login vas a poder acceder a esto: */
router.get('/user', verifyToken, utils_1.safe(actions.getUser));
exports["default"] = router;
