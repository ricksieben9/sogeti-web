import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {roles} from "./roles";
import {person} from "./person";
import {group_dispensers} from "./group_dispensers";
import {intake_moment} from "./intake_moment";
import {log} from "./log";


@Entity("user",{schema:"asautar_db" } )
@Index("email_UNIQUE",["email",],{unique:true})
@Index("fk_Person_Roles_idx",["roles_role",])
export class user {

   
    @ManyToOne(type=>roles, roles=>roles.users,{  nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'roles_role'})
    roles_role:roles | null;


   
    @OneToOne(type=>person, person=>person.user,{ primary:true, nullable:false,onDelete: 'NO ACTION',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'person_id'})
    person_:person | null;


    @Column("varchar",{ 
        nullable:false,
        unique: true,
        length:100,
        name:"email"
        })
    email:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"password"
        })
    password:string;
        

   
    @OneToMany(type=>group_dispensers, group_dispensers=>group_dispensers.person_,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    group_dispenserss:group_dispensers[];
    

   
    @OneToMany(type=>intake_moment, intake_moment=>intake_moment.dispenser,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    intake_moments:intake_moment[];
    

   
    @OneToMany(type=>log, log=>log.user_,{ onDelete: 'NO ACTION' ,onUpdate: 'NO ACTION' })
    logs:log[];
    
}
