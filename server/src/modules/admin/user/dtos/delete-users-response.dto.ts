import { Field, ObjectType } from '@nestjs/graphql';
import { UserResponseDto } from './user.response.dto';

@ObjectType()
export class DeleteUsersResponseDto {
  @Field()
  message: string;

  @Field(() => [UserResponseDto])
  results: UserResponseDto[];

  @Field(() => [String], { nullable: true })
  errors?: string[];
}
