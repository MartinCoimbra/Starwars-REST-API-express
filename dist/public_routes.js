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
exports.__esModule = true;
var express_1 = require("express");
var utils_1 = require("./utils");
var actions = __importStar(require("./actions"));
var router = express_1.Router();
// RUTA PUBLICA , cualquiera puede hacer las siguientes acciones.
/* Posteamos 1 usuario (Registro, publico)*/
router.post('/user', utils_1.safe(actions.createUser));
/*
* Nota: Cuando una persona se va iniciar sesion, entra a travez de una ruta publica "/login".
* Nota: Cuando vas a ingresar datos (login) vas a hacer un post!.
*/
router.post('/login', utils_1.safe(actions.login));
/* ********************************************************** */
/* PERSONAJES RUTAS */
/* POST una 1 person  */
router.post('/person', utils_1.safe(actions.postPerson));
/* Ruta GET para TODOS los persons *(PEOPLE)* - PERSONAJES - */
router.get('/persons', utils_1.safe(actions.getPostPersons));
/* Ruta get *UNO SOLO* de los personajes */
router.get('/person/:id', utils_1.safe(actions.getPostPerson));
/* ********************************************************** */
/* RUTAS PLANETS */
/* Ruta POST 1 planet */
router.post('/planet', utils_1.safe(actions.postPlanet));
/* Ruta get TODOS los personajes */
router.get('/planets', utils_1.safe(actions.getPlanets));
/* Ruta get *UNO SOLO* de los planetas */
router.get('/planet/:id', utils_1.safe(actions.getPlanet));
exports["default"] = router;
