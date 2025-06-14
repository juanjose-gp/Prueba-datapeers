import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entidades/user.entidad';
import { CreateUserDto } from '../auth/dto/create-users.dto';
import * as bcrypt from 'bcrypt';
import { MESSAGES, CONSTANTS } from 'src/globals/messages';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Crear un nuevo usuario verificando si ya existe por correo.
   * Devuelve el usuario sin la contraseña.
   */
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const userExist = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (userExist) {
      throw new ConflictException(MESSAGES.auth.EMAIL_REGISTERED);
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      CONSTANTS.SALT_ROUNDS,
    );

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);

    // Retornar el usuario sin la contraseña
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }
  

  /**
   * Buscar un usuario por email.
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Buscar un usuario por nombre de usuario.
   */
  async findByUsuario(usuario: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { usuario } });
  }

  /**
   * Buscar un usuario por ID con control de error si no se encuentra.
   */
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(MESSAGES.USER.NOT_FOUND);
    }

    return user;
  }
}
