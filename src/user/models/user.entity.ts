import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class UserEntity{
   @PrimaryGeneratedColumn() 
   id : number ;
   
   @Column()
   name: string ;
   
   @Column({ unique : true })
   username : string ;

   @Column({ nullable: true})
   password : string ;

   @Column({ unique : true })
   email : string ;

   @BeforeInsert()
   emailToLowerCase(){
       this.email = this.email.toLowerCase();
   }
   @Column({ default: false })
  isAdmin: boolean;

   comparePassword(password: string): Promise<boolean> {
   return bcrypt.compare(password, this.password);
 }

  
}