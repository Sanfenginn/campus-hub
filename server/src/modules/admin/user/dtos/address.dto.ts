import { IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class UserAddressRequestDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  houseNumber: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  street: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  suburb: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  city: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  state: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  country: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  postalCode: string;
}

@ObjectType()
export class UserAddressResponseDto {
  @Field()
  houseNumber: string;

  @Field()
  street: string;

  @Field()
  suburb: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  country: string;

  @Field()
  postalCode: string;
}
