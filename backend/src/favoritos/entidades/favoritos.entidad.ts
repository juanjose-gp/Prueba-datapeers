import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn,  } from 'typeorm';
import { User } from 'src/users/entidades/user.entidad';

@Entity('favorite_movie')
export class FavoriteMovie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imdbID: string;

  @Column()
  title: string;

  @Column()
  year: string;

  @Column()
  poster: string;

  @Column({ type: 'text', nullable: true })
  comentario: string;

  @Column({ type: 'int', nullable: true })
  calificacion: number;

  /**
   * Relación: muchos favoritos pertenecen a un solo usuario.
   */
  @ManyToOne(() => User, user => user.favorites, { eager: false })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
