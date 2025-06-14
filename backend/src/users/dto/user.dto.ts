import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { MESSAGES } from 'src/globals/messages';

/**
 * DTO para crear un nuevo usuario.
 * Valida los campos requeridos en el registro.
 */
export class CreateUserDto {
  @IsNotEmpty({ message: MESSAGES.validation.nombreRequired })
  nombre: string;

  @IsNotEmpty({ message: MESSAGES.validation.usuarioRequired })
  usuario: string;

  @IsEmail({}, { message: MESSAGES.validation.emailInvalid })
  email: string;

  @MinLength(6, { message: MESSAGES.validation.passwordMin })
  password: string;
}
