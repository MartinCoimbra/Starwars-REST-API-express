import {Entity, PrimaryGeneratedColumn, Column, BaseEntity , ManyToOne, OneToMany } from "typeorm"
 import {FavsPersons} from "./FavPerson"
 
@Entity()
export class PostPersons extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    descripcion:string

    @Column()
    birth_year:string
    
    @Column()
    gender:string
    
    @Column()
    height:number
    
    @Column()
    skin_color:string
    
    @Column()
    hair_color:string

    @Column()
    foto:string

    @OneToMany(() => FavsPersons, favspersons => favspersons.postpersons)
   favspersons: FavsPersons;
}