import { Field, ObjectType, ID } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserRoleResponseDto } from './role.dto';
import { UserAddressResponseDto } from './address.dto';
import { UserContactResponseDto } from './contact.dto';
import { UserNameResponseDto } from './name.dto';

@ObjectType()
export class UserResponseDto {
  @Field(() => ID)
  id: string;

  @ValidateNested()
  @Type(() => UserNameResponseDto)
  @Field(() => UserNameResponseDto)
  name: UserNameResponseDto;

  @Field()
  dob: Date;

  @Field()
  account: string;

  @Field()
  password: string;

  @ValidateNested()
  @Type(() => UserRoleResponseDto)
  @Field(() => UserRoleResponseDto)
  role: UserRoleResponseDto;

  @ValidateNested()
  @Type(() => UserAddressResponseDto)
  @Field(() => UserAddressResponseDto)
  address: UserAddressResponseDto;

  @ValidateNested()
  @Type(() => UserContactResponseDto)
  @Field(() => UserContactResponseDto)
  contact: UserContactResponseDto;
}
