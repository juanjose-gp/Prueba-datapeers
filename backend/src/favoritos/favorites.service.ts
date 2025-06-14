import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteMovie } from './entidades/favoritos.entidad';
import { MESSAGES } from 'src/globals/messages';

@Injectable()
export class FavoritosService {
  constructor(
    @InjectRepository(FavoriteMovie)
    private readonly favoritosRepo: Repository<FavoriteMovie>,
  ) {}

  /**
   * Guarda una película como favorita para un usuario autenticado.
   * Solo se guarda si no ha sido añadida previamente.
   *
   * @param pelicula - Datos de la película (título, año, poster, comentario, calificación opcionales)
   * @param userId - ID del usuario autenticado
   * @returns La película guardada como favorita
   * @throws BadRequestException si la película ya existe como favorita
   */
  async guardar(pelicula: any, userId: number) {
    const yaExiste = await this.favoritosRepo.findOne({
      where: {
        imdbID: pelicula.imdbID,
        user: { id: userId },
      },
    });

    if (yaExiste) {
      throw new BadRequestException(MESSAGES.FAVORITES.ALREADY_EXISTS);
    }

    const favorito = this.favoritosRepo.create({
      imdbID: pelicula.imdbID,
      title: pelicula.title,
      year: pelicula.year,
      poster: pelicula.poster,
      comentario: pelicula.comentario ?? null,
      calificacion: pelicula.calificacion ?? null,
      user: { id: userId },
    });
     //console.log('Agregando favorito con el usuario:', userId);
    //console.log(favorito);
    return this.favoritosRepo.save(favorito);
  }

  /**
   * Lista todas las películas favoritas de un usuario autenticado.
   *
   * @param userId - ID del usuario autenticado
   * @returns Arreglo de películas favoritas
   */
  async listar(userId: number) {
    return this.favoritosRepo.find({
      where: { user: { id: userId } },
      order: { id: 'DESC' },
    });
  }

  /**
   * Permite actualizar el comentario y/o calificación de una película favorita.
   * Solo el dueño del recurso puede modificarlo.
   *
   * @param id - ID del favorito a editar
   * @param userId - ID del usuario autenticado
   * @param datos - Objeto con los campos opcionales: comentario y calificacion
   * @returns La película favorita actualizada
   * @throws NotFoundException si el favorito no pertenece al usuario
   */
  async actualizarComentarioYCalificacion(
    id: number,
    userId: number,
    datos: { comentario?: string; calificacion?: number },
  ) {
    const favorito = await this.favoritosRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!favorito) {
      throw new NotFoundException(MESSAGES.FAVORITES.NOT_FOUND);
    }

    favorito.comentario = datos.comentario ?? favorito.comentario;
    favorito.calificacion = datos.calificacion ?? favorito.calificacion;

    return this.favoritosRepo.save(favorito);
  }
  async obtenerPorId(id: number, userId: number) {
  const favorito = await this.favoritosRepo.findOne({
    where: { id, user: { id: userId } },
  });

  if (!favorito) throw new NotFoundException(MESSAGES.FAVORITES.NOT_FOUND);
  return favorito;
}

async eliminar(id: number, userId: number) {
  const favorito = await this.favoritosRepo.findOne({
    where: { id, user: { id: userId } },
  });

  if (!favorito) throw new NotFoundException(MESSAGES.FAVORITES.NOT_FOUND);
  return this.favoritosRepo.remove(favorito);
}

}
