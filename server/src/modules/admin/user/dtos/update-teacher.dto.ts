import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class AssignToTeacherDto {
  @IsString()
  @Field(() => [ID], { nullable: true })
  courses?: string[];

  @IsString()
  @Field(() => [ID], { nullable: true })
  studentClasses?: string[];
}
