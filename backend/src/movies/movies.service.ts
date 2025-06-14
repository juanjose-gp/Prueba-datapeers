import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CONSTANTS } from 'src/globals/messages';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Busca películas por título en la API de OMDb
   * @param title Título de la película a buscar
   * @returns Resultado de la búsqueda desde OMDb
   */
  async searchMovies(title: string) {
    const url = `${CONSTANTS.OMDB_API_URL}?s=${encodeURIComponent(title)}&apikey=${CONSTANTS.OMDB_API_KEY}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  /**
   * Obtiene detalles de una película por ID de IMDb
   * @param imdbID ID de la película
   * @returns Detalles de la película desde OMDb
   */
  async getMovieById(imdbID: string) {
    const url = `${CONSTANTS.OMDB_API_URL}?i=${encodeURIComponent(imdbID)}&apikey=${CONSTANTS.OMDB_API_KEY}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
