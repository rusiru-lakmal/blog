import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { match } from 'assert';
import { catchError, from, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository : Repository<UserEntity>,
        private  authService : AuthService
    ){}

    // create(user:User) : Promise(User){
    //     return this.userRepository.save(User);
    // }

     crete(user: User): Promise<User> {   
      return from(this.authService.hashPassword(user.password)).pipe(
         switchMap((passwordHash: string) => {
             const newUser = new UserEntity();
               newUser.email = user.email;
               newUser.password = passwordHash;
               newUser.name = user.name;
               newUser.username = user.username;
               newUser.isAdmin = user.isAdmin;

               
               return from(this.userRepository.save(newUser)).pipe(
                   map((user: User) => {
                         const { password , ...results } = user;
                         return results;
                     }),
                     catchError (err => {
                        
                         throw new Error(err);
                     })
                   );
               })
             ).toPromise();
      
      
         }
             

       findUserByEmail(email: string): Promise<User> {
         return this.userRepository.findOne({ where: { email } });
       }
     
       findUserById(id: number): Promise<User> {
         return  this.userRepository.findOne({ where: { id } });
       }

     findAll():Promise<User[]>{
        return from(this.userRepository.find()).pipe(
         map((users: User[]) => {
            users.forEach(function (v)
            {
                delete v.password;
            }
            );
            return users;
         }),

         ).toPromise();
               
       }
     deleteOne( id : number):Promise<any>{
        return this.userRepository.delete(id);
     }
     updateOne(id : number , user: User):Promise<any>{
         delete user.password;
         delete user.email;
        return this.userRepository.update( id , user)
     }
     

     login(user : User):Observable<string>{
         return from(this.validateUser(user.email,user.password)).pipe(
            switchMap((user: User) => {
               if(user){
                  return from(this.authService.generateJWT(user)).pipe(
                     map((jwt: string) => jwt)
                  );
               }else{
                  return 'User not found';
            }
         })
         )
       }

       validateUser( email : string , password: string):Observable<User>{
         return from(this.findUserByEmail(email)).pipe(
            switchMap((user:User)=>
            from(this.authService.comparePasswords(password,user.password)).pipe(
                  map((match: boolean) => {  
                     if (match) {
                           const { password, ...result } = user;
                           return result;
                           } else {
                           throw Error;
                           }
                         }),

               )
            )
         )
         }
            

                               
                               



     findOne(id : number):Promise<User>{
       return from(this.userRepository.findOne({ where: { id } })).pipe(
         map((user: User) => {
             const { password, ...result } = user;

               return result;
             }),

             ).toPromise();
       }
       

     }

