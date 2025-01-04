import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { College } from './college.entity';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => College, college => college.city)
  colleges: College[];
}
