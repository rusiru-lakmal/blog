import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
import { UserModule } from './user/user.module';
//import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
env
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      url:'postgres://jicgvdpl:bU2ZjuLe7mOacZ1RUM40OlbZOe39dG0c@mel.db.elephantsql.com/jicgvdpl',
      autoLoadEntities:true,
      synchronize:true,
    }),
    UserModule,
  //  ApiModule,
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
