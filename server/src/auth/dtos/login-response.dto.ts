import { ObjectType, Field } from '@nestjs/graphql';
import { UserResponseDto } from '../../modules/admin/user/dtos/user.response.dto';

@ObjectType()
class Role {
  @Field()
  userType: string;

  @Field()
  userId: string;
}

@ObjectType()
export class LoginResponseDto {
  @Field()
  token: string;

  @Field(() => Role)
  role: Role;

  // @Field(() => UserResponseDto)
  // user: UserResponseDto;
}
