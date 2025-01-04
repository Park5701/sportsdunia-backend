import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { College } from './college.entity';

@Entity('college_placements')
export class CollegePlacement {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => College, college => college.placements, { onDelete: 'CASCADE' })
  college: College;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  highest_placement: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  average_placement: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  median_placement: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  placement_rate: number;
}
