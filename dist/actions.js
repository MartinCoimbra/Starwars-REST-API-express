"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deletePostPersonFav = exports.deletePostPlanetFav = exports.addPostPersonFav = exports.addPostPlanetFav = exports.getFavoritos = exports.login = exports.getPlanet = exports.getPlanets = exports.postPlanet = exports.getPostPerson = exports.getPostPersons = exports.postPerson = exports.getUser = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var utils_1 = require("./utils");
var PostPersons_1 = require("./entities/PostPersons");
var PostPlanets_1 = require("./entities/PostPlanets");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var FavPerson_1 = require("./entities/FavPerson");
var FavsPlanets_1 = require("./entities/FavsPlanets");
/* ************************************************************************************ */
/* USUARIOS - USER's */
/* ************************************************************************************ */
/* POST 1 usuario */
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(Users_1.Users).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
/* GET el usuario actual */
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.user) {
                    console.log(req.user.user.id);
                }
                console.log(req.user);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.user.user.id)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.getUser = getUser;
/* ************************************************************************************ */
/* PEOPLE - PERSON - POSTPERSON */
/* Le agregamos el nombre post para no conundir con users */
/* ************************************************************************************ */
/* POST *UN 1*  de los PERSONAJE*/
var postPerson = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var person, newPerson, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                /* Validaciones de datos del personaje */
                if (!req.body.name)
                    throw new utils_1.Exception("Ingrese nombre ( name )");
                if (!req.body.descripcion)
                    throw new utils_1.Exception("Ingrese descripcion ( descripcion )");
                if (!req.body.birth_year)
                    throw new utils_1.Exception("Ingrese año de nacimiento ( birth_year )");
                if (!req.body.gender)
                    throw new utils_1.Exception("Ingrese Genero ( gender )");
                if (!req.body.height)
                    throw new utils_1.Exception("Ingrese Altura ( height )");
                if (!req.body.skin_color)
                    throw new utils_1.Exception("Ingrese  Color de piel ( skin_color )");
                if (!req.body.hair_color)
                    throw new utils_1.Exception("Ingrese Color de pelo ( hair_color )");
                if (!req.body.foto)
                    throw new utils_1.Exception("Ingrese URL de la foto ( foto )");
                return [4 /*yield*/, typeorm_1.getRepository(PostPersons_1.PostPersons).findOne({ where: { name: req.body.name } })];
            case 1:
                person = _a.sent();
                if (person)
                    throw new utils_1.Exception("Este personaje ya existe");
                newPerson = typeorm_1.getRepository(PostPersons_1.PostPersons).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(PostPersons_1.PostPersons).save(newPerson)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.postPerson = postPerson;
/* Leemos todos los PERSONAJES*/
var getPostPersons = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var persons;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(PostPersons_1.PostPersons).find()];
            case 1:
                persons = _a.sent();
                return [2 /*return*/, res.json(persons)];
        }
    });
}); };
exports.getPostPersons = getPostPersons;
/* Leemos *UNO 1*  de los PERSONAJES*/
var getPostPerson = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var person;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(PostPersons_1.PostPersons).findOne(req.params.id)];
            case 1:
                person = _a.sent();
                return [2 /*return*/, res.json(person)];
        }
    });
}); };
exports.getPostPerson = getPostPerson;
/* ************************************************************************************ */
/* PLANETS - PLANETAS  */
/* ************************************************************************************ */
/* POST *UN 1*  de los Planeta*/
var postPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet, newPlanet, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                /* Validaciones de datos del Planeta */
                if (!req.body.name)
                    throw new utils_1.Exception("Ingrese nombre ( name )");
                if (!req.body.descripcion)
                    throw new utils_1.Exception("Ingrese descripcion ( descripcion )");
                if (!req.body.climate)
                    throw new utils_1.Exception("Ingrese año de Clima ( climate )");
                if (!req.body.population)
                    throw new utils_1.Exception("Ingrese población ( population )");
                if (!req.body.orbital_period)
                    throw new utils_1.Exception("Ingrese periodo orbital ( orbital_period )");
                if (!req.body.rotation_period)
                    throw new utils_1.Exception("Ingrese período_de_rotación ( rotation_period )");
                if (!req.body.diameter)
                    throw new utils_1.Exception("Ingrese diámetro ( diameter )");
                if (!req.body.foto)
                    throw new utils_1.Exception("Ingrese URL de la foto ( foto )");
                return [4 /*yield*/, typeorm_1.getRepository(PostPlanets_1.PostPlanets).findOne({ where: { name: req.body.name } })];
            case 1:
                planet = _a.sent();
                if (planet)
                    throw new utils_1.Exception("Este planeta ya existe");
                newPlanet = typeorm_1.getRepository(PostPlanets_1.PostPlanets).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(PostPlanets_1.PostPlanets).save(newPlanet)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.postPlanet = postPlanet;
/* Leemos todos los PLANETAS*/
var getPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(PostPlanets_1.PostPlanets).find()];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getPlanets = getPlanets;
/* Leemos *UNO 1*  de los PLANETAS*/
var getPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(PostPlanets_1.PostPlanets).findOne(req.params.id)];
            case 1:
                planet = _a.sent();
                return [2 /*return*/, res.json(planet)];
        }
    });
}); };
exports.getPlanet = getPlanet;
/* ************************************************************************************ */
/* TOKEN - LOGIN  */
/* ************************************************************************************ */
//controlador para el logueo "/login"
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                /* Validamos si completo los campos correctamente */
                if (!req.body.email)
                    throw new utils_1.Exception("Verifique el email", 400);
                if (!req.body.password)
                    throw new utils_1.Exception("Verifique el password", 400);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Email o password incorrecto", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                // Devolvera el usuario y el token creado recientemente al cliente
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
/* ************************************************************************************ */
/* FAVORITOS  */
/* ************************************************************************************ */
var getFavoritos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var favoritosPlanets, favoritosPersons;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(FavsPlanets_1.FavsPlanets).find({ where: { users: req.user.user.id },
                    relations: ['postplanets'] })];
            case 1:
                favoritosPlanets = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(FavPerson_1.FavsPersons).find({ where: { users: req.user.user.id },
                        relations: ['postpersons'] })];
            case 2:
                favoritosPersons = _a.sent();
                return [2 /*return*/, res.json({
                        favoritosPersons: favoritosPersons,
                        favoritosPlanets: favoritosPlanets
                    })];
        }
    });
}); };
exports.getFavoritos = getFavoritos;
var addPostPlanetFav = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, planet, newFavorito, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.user.id;
                return [4 /*yield*/, typeorm_1.getRepository(PostPlanets_1.PostPlanets).findOne(req.params.id)];
            case 1:
                planet = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("El planeta que selecciono no existe, cambie su id");
                newFavorito = new FavsPlanets_1.FavsPlanets();
                newFavorito.users = userID;
                newFavorito.postplanets = planet;
                return [4 /*yield*/, typeorm_1.getRepository(FavsPlanets_1.FavsPlanets).save(newFavorito)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.addPostPlanetFav = addPostPlanetFav;
var addPostPersonFav = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, person, newFavorito, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.user.id;
                return [4 /*yield*/, typeorm_1.getRepository(PostPersons_1.PostPersons).findOne(req.params.id)];
            case 1:
                person = _a.sent();
                if (!person)
                    throw new utils_1.Exception("El planeta que selecciono no existe, cambie su id");
                newFavorito = new FavPerson_1.FavsPersons();
                newFavorito.users = userID;
                newFavorito.postpersons = person;
                return [4 /*yield*/, typeorm_1.getRepository(FavPerson_1.FavsPersons).save(newFavorito)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.addPostPersonFav = addPostPersonFav;
var deletePostPlanetFav = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var favoritoPlanet, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(FavsPlanets_1.FavsPlanets).findOne({
                    relations: ['postplanets'],
                    where: {
                        users: req.user.user.id,
                        postplanets: req.params.id
                    }
                })];
            case 1:
                favoritoPlanet = _a.sent();
                console.log(favoritoPlanet);
                if (!!favoritoPlanet) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ "messager": "El favorito que desea borrar no esta" })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(FavsPlanets_1.FavsPlanets)["delete"](favoritoPlanet)];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.deletePostPlanetFav = deletePostPlanetFav;
var deletePostPersonFav = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var favoritoPerson, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(FavPerson_1.FavsPersons).findOne({
                    relations: ['postpersons'],
                    where: {
                        users: req.user.user.id,
                        postpersons: req.params.id
                    }
                })];
            case 1:
                favoritoPerson = _a.sent();
                console.log(favoritoPerson);
                if (!!favoritoPerson) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ "messager": "El favorito que desea borrar no esta" })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(FavPerson_1.FavsPersons)["delete"](favoritoPerson)];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.deletePostPersonFav = deletePostPersonFav;
