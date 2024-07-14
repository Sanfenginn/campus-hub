import { ObjectType, Field } from '@nestjs/graphql';
import { UserResponseDto } from '../../modules/admin/user/dtos/user.response.dto';

@ObjectType()
export class LoginResponseDto {
  @Field()
  token: string;

  @Field(() => UserResponseDto)
  user: UserResponseDto;
}
