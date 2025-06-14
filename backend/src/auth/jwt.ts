import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { MESSAGES } from 'src/globals/messages';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new InternalServerErrorException(MESSAGES.auth.jwtSecretNotFound);
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  /**
   * Método llamado automáticamente por Passport después de verificar el token JWT.
   * Devuelve los datos que estarán disponibles en `req.user`.
   */
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
