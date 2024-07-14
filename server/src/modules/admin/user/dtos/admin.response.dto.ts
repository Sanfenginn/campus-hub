import { Field, ObjectType, ID } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserNameResponseDto } from './name.dto';

@ObjectType()
export class AdminResponseDto {
  @Field(() => ID)
  id: string;

  @ValidateNested()
  @Type(() => UserNameResponseDto)
  @Field(() => UserNameResponseDto)
  name: UserNameResponseDto;

  @Field(() => String, { nullable: true })
  userId: string;
}
