// import { IsString, IsNotEmpty } from 'class-validator';
// import { Field, InputType, ObjectType } from '@nestjs/graphql';

// class UserNameBase {
//   @IsString()
//   @IsNotEmpty()
//   @Field()
//   firstName: string;

//   @IsString()
//   @IsNotEmpty()
//   @Field()
//   lastName: string;
// }

// @InputType()
// export class UserNameRequestDto extends UserNameBase {}

// @ObjectType()
// export class UserNameResponseDto extends UserNameBase {}

import { IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class UserNameRequestDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  lastName: string;
}

@ObjectType()
export class UserNameResponseDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  lastName: string;
}
