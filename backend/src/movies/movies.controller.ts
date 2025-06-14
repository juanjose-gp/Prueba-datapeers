import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { MoviesService } from './movies.service';


@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MoviesService) {}

  /**
   * Endpoint para buscar películas por título
   * @param title Query param con el título a buscar
   */
  @Get('search')
  async search(@Query('title') title: string, @Request() req: any) {
    // console.log('Token recibido:', req.user); // Comentado por ahora
    return this.movieService.searchMovies(title);
  }
}
