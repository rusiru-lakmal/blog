import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private jwtService : JwtService) { }

    generateJWT(user:User):Promise<string>{ {
       return this.jwtService.signAsync({user});
    }}

    hashPassword(password:string):Promise<string>{
        return bcrypt.hash(password,12);
    }

    comparePasswords(newPassword:string, passwordHash:string):Promise<boolean>{
        return bcrypt.compare(newPassword,passwordHash);
    }
}