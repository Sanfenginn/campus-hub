import { InputType, PartialType } from '@nestjs/graphql';
import { CourseRequestDto } from './course.request.dto';

@InputType()
export class UpdateCourseDto extends PartialType(CourseRequestDto) {}
