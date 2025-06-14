import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController} from './auth.controller';
import { UsersModule } from '../users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entidades/user.entidad';
import { JwtStrategy } from './jwt.strategy'; 
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET') || 'defaultSecret',
    signOptions: { expiresIn: '1h' },
  }),
  inject: [ConfigService],
}),

  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], 
  exports: [AuthService],
})
export class AuthModule {}
