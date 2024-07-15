import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { CourseRequestDto } from './dtos/course.request.dto';
import { CourseResponseDto } from './dtos/course.response.dto';
import { UpdateCourseDto } from './dtos/update.course.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Query(() => [CourseResponseDto])
  async findAllCourses(): Promise<CourseResponseDto[]> {
    return this.courseService.findAllCourses();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Query(() => CourseResponseDto)
  async findOneCourse(@Args('id') id: string): Promise<CourseResponseDto> {
    return await this.courseService.findOneCourse(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Mutation(() => CourseResponseDto)
  async createCourse(
    @Args('createCourse') createCourse: CourseRequestDto,
  ): Promise<CourseResponseDto> {
    return await this.courseService.createCourse(createCourse);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Mutation(() => CourseResponseDto)
  async updateCourse(
    @Args('id') id: string,
    @Args('updateCourseDto') updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResponseDto> {
    return await this.courseService.updateCourse(id, updateCourseDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Mutation(() => CourseResponseDto)
  async deleteCourse(@Args('id') id: string): Promise<CourseResponseDto> {
    return await this.courseService.deleteCourse(id);
  }
}
