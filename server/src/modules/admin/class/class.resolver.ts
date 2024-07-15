import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { ClassService } from './class.service';
import { ClassRequestDto } from './dtos/class.request.dto';
import { ClassResponseDto } from './dtos/class.response.dto';
import { UpdateClassDto } from './dtos/update.class.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class ClassResolver {
  constructor(private readonly classService: ClassService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher)
  @Query(() => [ClassResponseDto])
  async findAllClasses(): Promise<ClassResponseDto[]> {
    return await this.classService.findAllClasses();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher)
  @Query(() => ClassResponseDto)
  async findOneClass(@Args('id') id: string): Promise<ClassResponseDto> {
    return await this.classService.findOneClass(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Mutation(() => ClassResponseDto)
  async createClass(
    @Args('createClassDto') createClassDto: ClassRequestDto,
  ): Promise<ClassResponseDto> {
    return await this.classService.createClass(createClassDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Mutation(() => ClassResponseDto)
  async updateClass(
    @Args('id') id: string,
    @Args('updateClassDto') updateClassDto: UpdateClassDto,
  ): Promise<ClassResponseDto> {
    return await this.classService.updateClass(id, updateClassDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Mutation(() => ClassResponseDto)
  async deleteClass(@Args('id') id: string): Promise<ClassResponseDto> {
    return await this.classService.deleteClass(id);
  }
}
