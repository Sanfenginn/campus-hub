import { CourseSchemaResponseDto } from './courseSchedule.dto';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@ObjectType()
export class CourseResponseDto {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  classroom: string;

  @ValidateNested()
  @Type(() => CourseSchemaResponseDto)
  @Field(() => CourseSchemaResponseDto)
  courseSchedule: CourseSchemaResponseDto;

  @Field(() => ID, { nullable: true })
  instructor?: string;

  @Field(() => ID, { nullable: true })
  studentClasses?: string;
}
