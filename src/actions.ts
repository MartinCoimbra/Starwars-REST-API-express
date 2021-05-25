import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { PostPersons } from './entities/PostPersons'

/* Creamos 1 user con validaciones */
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

/* Leemos todos los Users */
export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
    const users = await getRepository(Users).find();
    return res.json(users);
}

/* ************************************************************************************ */
                        /* PEOPLE - PERSON - POSTPERSON */
/* ************************************************************************************ */

/* Leemos todos los PERSONAJES*/
export const getPostPersons = async (req: Request, res: Response): Promise<Response> =>{
    const persons = await getRepository(PostPersons).find();
    return res.json(persons);
}

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

/* Leemos *UNO 1*  de los PERSONAJES*/
export const getPostPerson = async (req: Request, res: Response): Promise<Response> =>{
    const person = await getRepository(PostPersons).findOne(req.params.id);
    return res.json(person);
}
/* ************************************************************************************ */
