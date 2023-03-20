import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { map, catchError, from, of } from 'rxjs';
import { User } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {


   constructor( private userService : UserService){

   }
    @Post()
   craete(@Body() user:User):Promise<User | object>{
    return  from(this.userService.crete(user)).pipe(
      map((user: User) => user),
      catchError(err => of({error : err.message}))
    ).toPromise();

   }

   @Post('login')
    login(@Body() user: User): Promise<User | object> {
      return this.userService.login(user).pipe(
        map((jwt : string) => ({access_token: jwt})
        )).toPromise();
    }

   
   @Get(':id')
    findOne(@Param() params): Promise<User> {
     return this.userService.findOne(params.id);
   }
   @Get()
   findAll():Promise<User[]>{
    return this.userService.findAll();
   }
   @Delete(':id')
   deleteOne(@Param('id') id :number):Promise<any>{
     return this.userService.deleteOne(id);
   }
   @Put(':id')
    updateOne(@Param('id') id: number, @Body() user: User): Promise<User>{
    return  this.userService.updateOne(id, user);
  }



}
function post() {
    throw new Error('Function not implemented.');
}

