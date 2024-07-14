import { IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { GraphQLScalarType, Kind } from 'graphql';
import { StudentResponseDto } from './student.response.dto';

// 自定义 GraphQL 标量类型，用于处理字符串或对象类型的 userId
export const GraphQLMixed = new GraphQLScalarType({
  name: 'Mixed',
  description: 'Can be a string or an object',
  parseValue(value: any) {
    return value; // 直接返回传入的值
  },
  serialize(value: any) {
    return value; // 直接返回传入的值
  },
  parseLiteral(ast) {
    let value;
    switch (ast.kind) {
      case Kind.STRING:
        return ast.value; // 返回字符串值
      case Kind.OBJECT:
        value = Object.create(null);
        ast.fields.forEach((field) => {
          value[field.name.value] = parseLiteral(field.value);
        });
        return value;
      default:
        return null;
    }
  },
});

// Helper function to parse nested literals
function parseLiteral(ast) {
  let value;
  switch (ast.kind) {
    case Kind.STRING:
      return ast.value;
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
      return parseInt(ast.value, 10);
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT:
      value = Object.create(null);
      ast.fields.forEach((field) => {
        value[field.name.value] = parseLiteral(field.value);
      });
      return value;
    case Kind.LIST:
      return ast.values.map(parseLiteral);
    default:
      return null;
  }
}

@InputType()
export class UserRoleRequestDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  userType: string;
}

@ObjectType()
export class UserRoleResponseDto {
  @IsString()
  @Field()
  userType: string;

  @IsString()
  @Field(() => GraphQLMixed, { nullable: true })
  userId?: string | StudentResponseDto;
}
