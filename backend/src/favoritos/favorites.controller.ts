import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Patch,
  Param,
  ParseIntPipe,
  Delete
} from '@nestjs/common';
import { FavoritosService } from './favorites.service';
import { JwtAuthGuard } from 'src/auth/jwt.rutas';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Favoritos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favoritos')

export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Post()
  async guardar(@Body() pelicula: any, @Request() req: any) {
    return this.favoritosService.guardar(pelicula, req.user.id);
  }

  @Get()
  async listar(@Request() req: any) {
    //console.log(' Usuario recibido en /favoritos:', req.user);
    return this.favoritosService.listar(req.user.id);
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.favoritosService.obtenerPorId(id, req.user.id);
  }

  @Patch(':id')
  async actualizarComentario(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: { comentario?: string; calificacion?: number },
    @Request() req: any,
  ) {
    return this.favoritosService.actualizarComentarioYCalificacion(id, req.user.id, datos);
  }

  @Delete(':id')
async eliminar(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
  return this.favoritosService.eliminar(id, req.user.id);
}
}