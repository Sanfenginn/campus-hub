import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class FindUsersRequestDto {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  Role?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  Name?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  Account?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  deptClass?: string;
}
