import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  account: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  password: string;
}
