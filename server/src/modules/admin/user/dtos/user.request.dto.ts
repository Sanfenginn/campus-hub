import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsDate, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { UserAddressRequestDto } from './address.dto';
import { UserContactRequestDto } from './contact.dto';
import { UserNameRequestDto } from './name.dto';
import { UserRoleRequestDto } from './role.dto';

@InputType()
export class UserRequestDto {
  @ValidateNested()
  @Type(() => UserNameRequestDto)
  @Field(() => UserNameRequestDto)
  name: UserNameRequestDto;

  @IsDate()
  @IsNotEmpty()
  @Field()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  @Field()
  account: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  password: string;

  @ValidateNested()
  @Type(() => UserRoleRequestDto)
  @Field(() => UserRoleRequestDto)
  role: UserRoleRequestDto;

  @ValidateNested()
  @Type(() => UserAddressRequestDto)
  @Field(() => UserAddressRequestDto)
  address: UserAddressRequestDto;

  @ValidateNested()
  @Type(() => UserContactRequestDto)
  @Field(() => UserContactRequestDto)
  contact: UserContactRequestDto;
}
