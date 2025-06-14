
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entidades/user.entidad';
import { FavoriteMovie } from '../favoritos/entidades/favoritos.entidad';

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const config = {
    type: 'postgres' as const,
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASS'),
    database: configService.get<string>('DB_NAME'),
    autoLoadEntities: true,
    logging: true,  
    entities: [User, FavoriteMovie],
    synchronize: true,
    
  };
  return config;
};
