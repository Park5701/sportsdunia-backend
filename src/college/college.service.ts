import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { College } from '../entities/college.entity';
import { CollegePlacement } from '../entities/college_placement.entity';
import { CollegeWiseCourse } from '../entities/college_wise_course.entity';
import { City } from '../entities/city.entity';
import { State } from '../entities/state.entity';

@Injectable()
export class CollegeService {
  constructor(
    @InjectRepository(College) private collegeRepo: Repository<College>,
    @InjectRepository(CollegePlacement) private placementRepo: Repository<CollegePlacement>,
    @InjectRepository(CollegeWiseCourse) private courseRepo: Repository<CollegeWiseCourse>,
    @InjectRepository(City) private cityRepo: Repository<City>,
    @InjectRepository(State) private stateRepo: Repository<State>,
  ) {}

  // ✅ Fetch placement data for a given college
  async getCollegeData(collegeId: number) {
    return await this.placementRepo.find({
      where: { college: { id: collegeId } },
      order: { year: 'DESC' },
    });
  }

  // ✅ Fetch courses offered by a given college
  async getCollegeCourses(collegeId: number) {
    return await this.courseRepo.find({
      where: { college: { id: collegeId } },
      order: { course_fee: 'DESC' },
    });
  }

  // ✅ Fetch colleges filtered by city or state
  async getColleges(city?: string, state?: string) {
    const query = this.collegeRepo.createQueryBuilder('college')
      .leftJoinAndSelect('college.city', 'city')
      .leftJoinAndSelect('college.state', 'state');

    if (city) {
      query.andWhere('city.name = :city', { city });
    }

    if (state) {
      query.andWhere('state.name = :state', { state });
    }

    return await query.orderBy('college.score', 'DESC').getMany();
  }
}
