import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { City } from './city.entity';
import { State } from './state.entity';
import { CollegePlacement } from './college_placement.entity';
import { CollegeWiseCourse } from './college_wise_course.entity';

@Entity('colleges')
export class College {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'int', default: 500 })
  score: number;

  @ManyToOne(() => City, city => city.colleges, { eager: true })
  city: City;

  @ManyToOne(() => State, state => state.colleges, { eager: true })
  state: State;

  @OneToMany(() => CollegePlacement, placement => placement.college)
  placements: CollegePlacement[];

  @OneToMany(() => CollegeWiseCourse, course => course.college)
  courses: CollegeWiseCourse[];
}
