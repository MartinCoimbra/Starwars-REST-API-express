import {Entity, PrimaryGeneratedColumn, Column, BaseEntity , ManyToOne, OneToMany } from "typeorm"
 import {FavsPlanets} from "./FavsPlanets"
 
@Entity()
export class PostPlanets extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    descripcion:string

    @Column()
    climate:string

    /* Lo ponemos string porque no vamos a hacer cuentas o algo con la poblacion */
    @Column()
    population:string
    
    @Column()
    orbital_period:string
    
    @Column()
    rotation_period:string
    
    @Column()
    diameter:string

    @Column()
    foto:string

   @OneToMany(() => FavsPlanets, favsplanets => favsplanets.postplanets)
   favsplanets: FavsPlanets;
}