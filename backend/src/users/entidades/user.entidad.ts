import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { FavoriteMovie } from 'src/favoritos/entidades/favoritos.entidad';

/**
 * datos de un usuario del sistema.
 * almacena información personal y de autenticación,
 * esta relacionada con películas favoritas.
 */

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  usuario: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;


  @OneToMany(() => FavoriteMovie, (favorite) => favorite.user)
  favorites: FavoriteMovie[];
}
