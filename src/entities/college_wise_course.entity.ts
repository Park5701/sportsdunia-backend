import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { College } from './college.entity';

@Entity('college_wise_courses')
export class CollegeWiseCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => College, college => college.courses, { onDelete: 'CASCADE' })
  college: College;

  @Column()
  course_name: string;

  @Column({ type: 'int' })
  course_duration: number; // Duration in years

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  course_fee: number;
}
