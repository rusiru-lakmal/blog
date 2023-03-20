import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';
import { AuthService } from './services/auth.service';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],

            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '60s' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
