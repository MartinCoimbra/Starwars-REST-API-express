import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { PostPersons } from './entities/PostPersons'
import { PostPlanets } from './entities/PostPlanets'
import jwt from 'jsonwebtoken'

/* ************************************************************************************ */
                            /* USUARIOS - USER's */
/* ************************************************************************************ */
/* POST 1 usuario */
export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

/* Quiero imprimir al usuario actual en la funcion de abajo  */
/* GET el usuario actual */
export const getUser = async (req: Request, res: Response): Promise<Response> =>{
    const user = await getRepository(Users).findOne(req.params.id);
    return res.json(user);
}

/* ************************************************************************************ */
                        /* PEOPLE - PERSON - POSTPERSON */
            /* Le agregamos el nombre post para no conundir con users */
/* ************************************************************************************ */

/* POST *UN 1*  de los PERSONAJE*/
export const postPerson = async (req: Request, res: Response): Promise<Response> =>{
    
    /* Validaciones de datos del personaje */
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

/* Leemos todos los PERSONAJES*/
export const getPostPersons = async (req: Request, res: Response): Promise<Response> =>{
    const persons = await getRepository(PostPersons).find();
    return res.json(persons);
}

/* Leemos *UNO 1*  de los PERSONAJES*/
export const getPostPerson = async (req: Request, res: Response): Promise<Response> =>{
    const person = await getRepository(PostPersons).findOne(req.params.id);
    return res.json(person);
}

/* ************************************************************************************ */
                            /* PLANETS - PLANETAS  */
/* ************************************************************************************ */
/* POST *UN 1*  de los Planeta*/
export const postPlanet = async (req: Request, res: Response): Promise<Response> =>{
    
    /* Validaciones de datos del Planeta */
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
/* Leemos todos los PLANETAS*/
export const getPlanets = async (req: Request, res: Response): Promise<Response> =>{
    const planets = await getRepository(PostPlanets).find();
    return res.json(planets);
}
/* Leemos *UNO 1*  de los PLANETAS*/
export const getPlanet = async (req: Request, res: Response): Promise<Response> =>{
    const planet = await getRepository(PostPlanets).findOne(req.params.id);
    return res.json(planet);
}
/* ************************************************************************************ */
                            /* TOKEN - LOGIN  */
/* ************************************************************************************ */
//controlador para el logueo "/login"
export const login = async (req: Request, res: Response): Promise<Response> =>{
    /* Validamos si completo los campos correctamente */
	if(!req.body.email) throw new Exception("Verifique el email", 400)
	if(!req.body.password) throw new Exception("Verifique el password", 400)
	// Validamos si existe un usuario con este correo electrónico y contraseña en la base de datos
	const user = await getRepository(Users).findOne({ where: { email: req.body.email, password: req.body.password }})
	if(!user) throw new Exception("Email o password incorrecto", 401)
	// Generamos el Token!!!
	const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });
	// Devolvera el usuario y el token creado recientemente al cliente
	return res.json({ user, token });
}