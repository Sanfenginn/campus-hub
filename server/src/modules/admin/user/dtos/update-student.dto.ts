import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class AssignToStudentDto {
  @IsString()
  @Field({ nullable: true })
  studentClass?: string;
}
