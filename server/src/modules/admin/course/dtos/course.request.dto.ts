import { CourseSchemaRequestDto } from './courseSchedule.dto';
import { Field, InputType, ID } from '@nestjs/graphql';
import { IsString, IsDate, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CourseRequestDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  classroom: string;

  @ValidateNested()
  @Type(() => CourseSchemaRequestDto)
  @Field(() => CourseSchemaRequestDto)
  courseSchedule: CourseSchemaRequestDto;

  @IsString()
  @Field({ nullable: true })
  instructor?: string;

  @IsString()
  @Field(() => [ID], { nullable: true })
  studentClasses?: string[];
}
