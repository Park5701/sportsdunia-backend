import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegeController } from './college.controller';
import { CollegeService } from './college.service';
import { College } from '../entities/college.entity';
import { CollegePlacement } from '../entities/college_placement.entity';
import { CollegeWiseCourse } from '../entities/college_wise_course.entity';
import { City } from '../entities/city.entity';
import { State } from '../entities/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([College, CollegePlacement, CollegeWiseCourse, City, State])],
  controllers: [CollegeController],
  providers: [CollegeService],
})
export class CollegeModule {}
