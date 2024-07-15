import { Field, InputType, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class ClassRequestDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @Field(() => [ID], { nullable: true })
  students?: string[];

  @IsString()
  @Field(() => [ID], { nullable: true })
  courses?: string[];
}
