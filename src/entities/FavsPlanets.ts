import {Entity, PrimaryGeneratedColumn, Column, BaseEntity , OneToMany, ManyToOne } from "typeorm"
import {PostPlanets} from "./PostPlanets"
import {Users} from "./Users"
@Entity()
export class FavsPlanets extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
     
   @ManyToOne(()=>PostPlanets, postplanets => postplanets.favsplanets)
    postplanets: PostPlanets;
   
  
   @ManyToOne(()=>Users, users => users.favsplanets)
    users: Users;
}