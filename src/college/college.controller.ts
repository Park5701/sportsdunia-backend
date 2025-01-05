import { Controller, Get, Param } from '@nestjs/common';
import { CollegeService } from './college.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('College')
@Controller('college')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}

  @Get('/college_data/:id')
  @ApiOperation({ summary: 'Get college data' })
  @ApiResponse({ status: 200, description: 'College data retrieved' })
  @ApiParam({ name: 'id', required: true, description: 'College ID' })
  getCollegeData(@Param('id') id: number) {
    return this.collegeService.getCollegeData(id);
  }

  @Get('/college_courses/:id')
  @ApiOperation({ summary: 'Get college courses' })
  @ApiResponse({ status: 200, description: 'College courses retrieved' })
  @ApiParam({ name: 'id', required: true, description: 'College ID' })
  getCollegeCourses(@Param('id') id: number) {
    return this.collegeService.getCollegeCourses(id);
  }
}
