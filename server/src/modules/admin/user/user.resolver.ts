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
import { AssignToTeacherDto } from './dtos/update-teacher.dto';
import { TeacherResponseDto } from './dtos/teacher.response.dto';
import { StudentResponseDto } from './dtos/student.response.dto';
import { AssignToStudentDto } from './dtos/update-student.dto';
import { FindUsersRequestDto } from './dtos/find-users.request.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Query(() => [UserResponseDto])
  async findAllUsers(
    @Args('condition', { nullable: true }) condition?: FindUsersRequestDto,
  ): Promise<UserResponseDto[]> {
    return await this.userService.findAllUsers(condition);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Query(() => UserResponseDto)
  async findOneUsers(@Args('id') id: string): Promise<UserResponseDto> {
    return await this.userService.findOneUser(id);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Mutation(() => UserResponseDto)
  async createUser(
    @Args('createUserDto') createUserDto: UserRequestDto,
  ): Promise<UserResponseDto> {
    console.log('createUserDto:', createUserDto);
    return await this.userService.createUser(createUserDto);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Mutation(() => UserResponseDto)
  async updateUser(
    @Args('id') id: string,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Mutation(() => UserResponseDto)
  async deleteUser(@Args('id') id: string): Promise<UserResponseDto> {
    return await this.userService.deleteUser(id);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Mutation(() => TeacherResponseDto)
  async assignToTeacher(
    @Args('id') id: string,
    @Args('assignToTeacherDto') assignToTeacherDto: AssignToTeacherDto,
  ): Promise<TeacherResponseDto> {
    return await this.userService.assignToTeacher(id, assignToTeacherDto);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Mutation(() => StudentResponseDto)
  async assignToStudent(
    @Args('id') id: string,
    @Args('assignToStudentDto') assignToStudentDto: AssignToStudentDto,
  ): Promise<StudentResponseDto> {
    return await this.userService.assignToStudent(id, assignToStudentDto);
  }
}
