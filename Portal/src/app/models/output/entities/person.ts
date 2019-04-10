import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {receiver} from "./receiver";
import {user} from "./user";


@Entity("person",{schema:"asautar_db" } )
export class person {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:45,
        name:"name"
        })
    name:string;
        

   
    @OneToOne(type=>receiver, receiver=>receiver.person_,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    receiver:receiver | null;


   
    @OneToOne(type=>user, user=>user.person_,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    user:user | null;

}
