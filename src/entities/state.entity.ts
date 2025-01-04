import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { College } from './college.entity';

@Entity('states')
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => College, college => college.state)
  colleges: College[];
}
