import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { MESSAGES, CONSTANTS } from '../globals/messages';
import { CreateUserDto } from './dto/create-users.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registra un nuevo usuario (hash se realiza en UsersService).
   */
  async register(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const existe = await this.usersService.findByEmail(createUserDto.email);
    if (existe) {
      throw new UnauthorizedException('El correo ya está registrado');
    }

    //console.log('Datos recibidos en el registro:', createUserDto);

    await this.usersService.create(createUserDto);

    return { message: 'Registro exitoso' };
  }

  /**
   * Verifica credenciales, genera token JWT y lo guarda en cookie HttpOnly.
   */
  async login(loginDto: LoginDto, res: Response): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      console.log('Usuario no encontrado:', loginDto.email);
      throw new UnauthorizedException(MESSAGES.auth.INVALID_CREDENTIALS);
    }

    console.log('Usuario encontrado:', 
    {
      email: user.email,
      passwordEnBD: user.password,
    });

    console.log('Contraseña ingresada:', loginDto.password);

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    console.log('¿Coincide la contraseña?', isMatch);

    if (!isMatch) {
      throw new UnauthorizedException(MESSAGES.auth.INVALID_CREDENTIALS);
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.nombre,
    };

    const token = this.jwtService.sign(payload, {
      expiresIn: CONSTANTS.TOKEN_EXPIRES_IN,
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, 
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    return { message: 'Login exitoso' };
  }
}
