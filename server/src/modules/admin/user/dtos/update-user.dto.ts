import { UserRequestDto } from './user.request.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto extends PartialType(UserRequestDto) {}
