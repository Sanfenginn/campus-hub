import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class ClassResponseDto {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [ID], { nullable: true })
  students?: string[];

  @Field(() => [ID], { nullable: true })
  courses?: string[];
}
