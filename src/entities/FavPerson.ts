import {Entity, PrimaryGeneratedColumn, Column, BaseEntity , OneToMany, ManyToOne } from "typeorm"
 import {PostPersons} from "./PostPersons"
 import {Users} from "./Users"
@Entity()
export class FavsPersons extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
     
   @ManyToOne(()=>PostPersons, postpersons => postpersons.favspersons)
    postpersons: PostPersons;
     
   @ManyToOne(()=>Users, users => users.favspersons)
    users: Users;
   
}