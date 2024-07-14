import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserResponseDto } from './dtos/user.response.dto';
import { UserRequestDto } from './dtos/user.request.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Query(() => [UserResponseDto])
  async findAllUsers(): Promise<UserResponseDto[]> {
    return await this.userService.findAllUsers();
  }

  @Query(() => UserResponseDto)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  async findOneUsers(@Args('id') id: string): Promise<UserResponseDto> {
    return await this.userService.findOneUser(id);
  }

  @Mutation(() => UserResponseDto)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createUser(
    @Args('createUserDto') createUserDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    console.log('createUserDto:', createUserDto);
    return await this.userService.createUser(createUserDto);
  }

  @Mutation(() => UserResponseDto)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Mutation(() => UserResponseDto)
  async deleteUser(@Args('id') id: string): Promise<UserResponseDto> {
    return await this.userService.deleteUser(id);
  }
}
