import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CourseSchemaRequestDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  dayOfWeek: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  endTime: string;

  @IsDate()
  @IsNotEmpty()
  @Field()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Field()
  endDate: Date;
}

@ObjectType()
export class CourseSchemaResponseDto {
  @Field()
  dayOfWeek: string;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;
}
