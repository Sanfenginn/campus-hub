// import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
// import { Field, InputType, ObjectType } from '@nestjs/graphql';

// class UserContactBase {
//   @IsEmail()
//   @IsNotEmpty()
//   @Field()
//   email: string;

//   @IsString()
//   @IsNotEmpty()
//   @Field()
//   phone: string;
// }

// @InputType()
// export class UserContactRequestDto extends UserContactBase {}

// @ObjectType()
// export class UserContactResponseDto extends UserContactBase {}

import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class UserContactRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  phone: string;
}

@ObjectType()
export class UserContactResponseDto {
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  phone: string;
}
