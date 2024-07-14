import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { CourseRequestDto } from './dtos/course.request.dto';
import { CourseResponseDto } from './dtos/course.response.dto';
import { UpdateCourseDto } from './dtos/update.course.dto';

@Resolver()
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query(() => [CourseResponseDto])
  async findAllCourses(): Promise<CourseResponseDto[]> {
    return this.courseService.findAllCourses();
  }

  @Query(() => CourseResponseDto)
  async findOneCourse(@Args('id') id: string): Promise<CourseResponseDto> {
    return await this.courseService.findOneCourse(id);
  }

  @Mutation(() => CourseResponseDto)
  async createCourse(
    @Args('createCourse') createCourse: CourseRequestDto,
  ): Promise<CourseResponseDto> {
    return await this.courseService.createCourse(createCourse);
  }

  @Mutation(() => CourseResponseDto)
  async updateCourse(
    @Args('id') id: string,
    @Args('updateCourseDto') updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResponseDto> {
    return await this.courseService.updateCourse(id, updateCourseDto);
  }

  @Mutation(() => CourseResponseDto)
  async deleteCourse(@Args('id') id: string): Promise<CourseResponseDto> {
    return await this.courseService.deleteCourse(id);
  }
}
