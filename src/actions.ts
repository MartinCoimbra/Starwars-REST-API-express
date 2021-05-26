import { Request, Response } from 'express'
import { getRepository, ObjectLiteral } from 'typeorm'   
import { Users } from './entities/Users'
import { Exception } from './utils'
import { PostPersons } from './entities/PostPersons'
import { PostPlanets } from './entities/PostPlanets'
import jwt from 'jsonwebtoken'
import { FavsPersons } from './entities/FavPerson'
import { FavsPlanets } from './entities/FavsPlanets'
/* ************************************************************************************ */
                            /* USUARIOS - USER's */
/* ************************************************************************************ */
/* POST 1 usuario */
export const createUser = async (req: Request, res:Response): Promise<Response> =>{
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")
	const userRepo = getRepository(Users)
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")
	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

/* GET el usuario actual */
export const getUser = async (req: Request, res: Response): Promise<Response> =>{
    const userID = (req.user as ObjectLiteral).user.id; 
   
    console.log(req.user)
    const user = await getRepository(Users).findOne(userID);
    return res.json(user);
}

/* ************************************************************************************ */
                        /* PEOPLE - PERSON - POSTPERSON */
            /* Le agregamos el nombre post para no conundir con users */
/* ************************************************************************************ */

/* POST *UN 1*  de los PERSONAJE*/
export const postPerson = async (req: Request, res: Response): Promise<Response> =>{
    if(!req.body.name) throw new Exception("Ingrese nombre ( name )")
    if(!req.body.descripcion) throw new Exception("Ingrese descripcion ( descripcion )")
    if(!req.body.birth_year) throw new Exception("Ingrese año de nacimiento ( birth_year )")
    if(!req.body.gender) throw new Exception("Ingrese Genero ( gender )")
    if(!req.body.height) throw new Exception("Ingrese Altura ( height )")
    if(!req.body.skin_color) throw new Exception("Ingrese  Color de piel ( skin_color )")
    if(!req.body.hair_color) throw new Exception("Ingrese Color de pelo ( hair_color )")
    if(!req.body.foto) throw new Exception("Ingrese URL de la foto ( foto )")
    /* Traemos todos los personajes para validar que no haya otro igual con el mismo nombre */
    const person = await getRepository(PostPersons).findOne({ where: {name: req.body.name }})
    if(person) throw new Exception("Este personaje ya existe")
    const newPerson = getRepository(PostPersons).create(req.body);  //Creo un personaje con los dato del body
	const results = await getRepository(PostPersons).save(newPerson); //Grabo el nuevo personaje
	return res.json(results);
}
/* GET (todos) PERSONAJES*/
export const getPostPersons = async (req: Request, res: Response): Promise<Response> =>{
    const persons = await getRepository(PostPersons).find();
    return res.json(persons);
}

/* GET *UNO 1* PERSONAJE*/
export const getPostPerson = async (req: Request, res: Response): Promise<Response> =>{
    const person = await getRepository(PostPersons).findOne(req.params.id);
    return res.json(person);
}
/* ************************************************************************************ */
                            /* PLANETS - PLANETAS  */
/* ************************************************************************************ */
/* POST *UN 1* Planeta*/
export const postPlanet = async (req: Request, res: Response): Promise<Response> =>{
    if(!req.body.name) throw new Exception("Ingrese nombre ( name )")
    if(!req.body.descripcion) throw new Exception("Ingrese descripcion ( descripcion )")
    if(!req.body.climate) throw new Exception("Ingrese año de Clima ( climate )")
    if(!req.body.population) throw new Exception("Ingrese población ( population )")
    if(!req.body.orbital_period) throw new Exception("Ingrese periodo orbital ( orbital_period )")
    if(!req.body.rotation_period) throw new Exception("Ingrese período_de_rotación ( rotation_period )")
    if(!req.body.diameter) throw new Exception("Ingrese diámetro ( diameter )")
    if(!req.body.foto) throw new Exception("Ingrese URL de la foto ( foto )")
    /* Traemos todos los planetas para validar que no haya otro igual con el mismo nombre */
    const planet = await getRepository(PostPlanets).findOne({ where: {name: req.body.name }})
    if(planet) throw new Exception("Este planeta ya existe")
    
    const newPlanet = getRepository(PostPlanets).create(req.body);  //Creo un planeta con los dato del body
	const results = await getRepository(PostPlanets).save(newPlanet); //Grabo el nuevo planeta
	return res.json(results);
}
/* GET (todos) PLANETAS*/
export const getPlanets = async (req: Request, res: Response): Promise<Response> =>{
    const planets = await getRepository(PostPlanets).find();
    return res.json(planets);
}
/* GET (UNO) PLANETA*/
export const getPlanet = async (req: Request, res: Response): Promise<Response> =>{
    const planet = await getRepository(PostPlanets).findOne(req.params.id);
    return res.json(planet);
}
/* ************************************************************************************ */
                            /* TOKEN - LOGIN  */
/* ************************************************************************************ */
export const login = async (req: Request, res: Response): Promise<Response> =>{
	if(!req.body.email) throw new Exception("Verifique el email", 400)
	if(!req.body.password) throw new Exception("Verifique el password", 400)
	// Validamos si existe un usuario con este correo electrónico y contraseña en la base de datos
	const user = await getRepository(Users).findOne({ where: { email: req.body.email, password: req.body.password }})
	if(!user) throw new Exception("Email o password incorrecto", 401)
	const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });// Generamos el Token!!!
	return res.json({ user, token });// Devolvera el usuario y el token creado recientemente al cliente
}
/* ************************************************************************************ */
                            /* FAVORITOS  */
/* ************************************************************************************ */
export const getFavoritos = async (req: Request, res: Response): Promise<Response> =>{
    const userID = (req.user as ObjectLiteral).user.id; 
    /* req.user.user.id usuario logeado */
    const favoritosPlanets = await getRepository(FavsPlanets).find({where:{users: userID}, 
        relations: ['postplanets']});
    const favoritosPersons = await getRepository(FavsPersons).find({where:{users: userID}, 
        relations: ['postpersons']});
    return res.json({
        favoritosPersons,
        favoritosPlanets,
    });
}

export const addPostPlanetFav = async (req: Request, res: Response): Promise<Response> =>{
    const userID = (req.user as ObjectLiteral).user.id; 
    /* Verificamos si el planeta existe */
    const planet = await getRepository(PostPlanets).findOne(req.params.id);
    if(!planet) throw new Exception("El planeta que selecciono no existe, cambie su id")
    /* Le asignamos los valores a los FK */
    let newFavorito = new FavsPlanets();
    newFavorito.users = userID;
    newFavorito.postplanets = planet;
  
    const results = await getRepository(FavsPlanets).save(newFavorito);   //Grabo el fav
    return res.json(results);
} 
export const addPostPersonFav = async (req: Request, res: Response): Promise<Response> =>{
    /* Verificamos si el planeta existe */
    const userID = (req.user as ObjectLiteral).user;
    const person = await getRepository(PostPersons).findOne(req.params.id);
    if(!person) throw new Exception("El planeta que selecciono no existe, cambie su id")
    /* Le asignamos los valores a los FK */
    let newFavorito = new FavsPersons();
    newFavorito.users = userID;
    newFavorito.postpersons = person;
    const results = await getRepository(FavsPersons).save(newFavorito);    //Grabo el fav
    return res.json(results);
} 
/* DELETE (:id) */
export const deletePostPlanetFav = async (req: Request, res: Response): Promise<Response> =>{
    const userID = (req.user as ObjectLiteral).user;
    const favoritoPlanet = await getRepository(FavsPlanets).findOne(
         {
            relations: ['postplanets'],
            where:{
                users: userID,
                postplanets: req.params.id 
            }
         });
        /* console.log(favoritoPlanet) */
        if(!favoritoPlanet){
            return res.json({"messager":"El favorito que desea borrar no esta"})
        }else{
            const result = await getRepository(FavsPlanets).delete(favoritoPlanet);
            return res.json(result);
        }
} 
export const deletePostPersonFav = async (req: Request, res: Response): Promise<Response> =>{
    const userID = (req.user as ObjectLiteral).user;
    const favoritoPerson = await getRepository(FavsPersons).findOne(
         {
            relations: ['postpersons'],
            where:{
                users: userID,
                postpersons: req.params.id 
            }
         });
        if(!favoritoPerson){
            return res.json({"messager":"El favorito que desea borrar no esta"})
        }else{
            const result = await getRepository(FavsPersons).delete(favoritoPerson);
            return res.json(result);
        }
} 
