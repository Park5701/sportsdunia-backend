import { Controller, Get, Param, Query } from '@nestjs/common';
import { CollegeService } from './college.service';

@Controller('college')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}

  // ✅ Get placement data for a specific college
  @Get('/college_data/:id')
  getCollegeData(@Param('id') id: number) {
    return this.collegeService.getCollegeData(id);
  }

  // ✅ Get courses offered by a specific college
  @Get('/college_courses/:id')
  getCollegeCourses(@Param('id') id: number) {
    return this.collegeService.getCollegeCourses(id);
  }

  // ✅ Get colleges filtered by city and state
  @Get('/colleges')
  getColleges(@Query('city') city?: string, @Query('state') state?: string) {
    return this.collegeService.getColleges(city, state);
  }
}
