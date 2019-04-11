import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {person} from "./person";
import {intake_moment} from "./intake_moment";
import {group} from "./group";


@Entity("receiver",{schema:"asautar_db" } )
export class receiver {

   
    @OneToOne(type=>person, person=>person.receiver,{ primary:true, nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'person_id'})
    person_:person | null;


   
    @OneToMany(type=>intake_moment, intake_moment=>intake_moment.receiver_id,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    intake_moments:intake_moment[];
    

    @ManyToMany(type=>group, group=>group.receivers)
    groups:group[];
    
}
