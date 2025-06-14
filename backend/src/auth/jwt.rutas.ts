import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * 
 * Protege las rutas usando la estrategia de autenticación JWT.
 * valida el token JWT y rechaza accesos no autorizados.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
