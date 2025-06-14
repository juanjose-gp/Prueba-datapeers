import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateFavoritoDto {
  @IsString()
  @IsNotEmpty()
  imdbID: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsString()
  @IsNotEmpty()
  poster: string;

  @IsOptional()
  @IsString()
  comentario?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  calificacion?: number;
}
