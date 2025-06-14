import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteMovie } from './entidades/favoritos.entidad';
import { FavoritosService } from './favorites.service';
import { FavoritosController } from './favorites.controller';
import { User } from '../users/entidades/user.entidad';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteMovie, User])],
  providers: [FavoritosService],
  controllers: [FavoritosController],
})
export class FavoritesModule {}
