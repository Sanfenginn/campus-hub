import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRequestDto } from './dtos/user.request.dto';
import { UserResponseDto } from './dtos/user.response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StudentResponseDto } from './dtos/student.response.dto';
import { TeacherResponseDto } from './dtos/teacher.response.dto';
import { AdminResponseDto } from './dtos/admin.response.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserResponseDto>,
    @InjectModel('Student')
    private readonly studentModel: Model<StudentResponseDto>,
    @InjectModel('Teacher')
    private readonly teacherModel: Model<TeacherResponseDto>,
    @InjectModel('Admin') private readonly adminModel: Model<AdminResponseDto>,
  ) {}

  async findAllUsers(): Promise<UserResponseDto[]> {
    const allUsers = await this.userModel
      .find({
        'role.userType': { $ne: 'admin' },
      })
      .exec();
    console.log('allUsers', allUsers);
    if (allUsers.length === 0) {
      throw new NotFoundException('Users not found');
    }
    return allUsers;
  }

  async findOneUser(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('Users not found');
    }
    return user;
  }

  async findOneByAccount(account: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ account }).exec();
    if (!user) {
      throw new NotFoundException('Users not found');
    }
    return user;
  }

  async createUser(createUserDto: UserRequestDto): Promise<UserResponseDto> {
    const newUser = new this.userModel(createUserDto);
    if (!newUser) {
      throw new NotFoundException('User not created');
    }
    const createdUser = await newUser.save();
    if (!createdUser) {
      throw new NotFoundException('User save failed');
    }

    let relatedRecord;
    if (createUserDto.role.userType === 'student') {
      relatedRecord = new this.studentModel({
        name: createUserDto.name,
        userId: createdUser._id,
      });
    } else if (createUserDto.role.userType === 'teacher') {
      relatedRecord = new this.teacherModel({
        name: createUserDto.name,
        userId: createdUser._id,
      });
    } else if (createUserDto.role.userType === 'admin') {
      relatedRecord = new this.adminModel({
        name: createUserDto.name,
        userId: createdUser._id,
      });
    }

    const savedRecord = await relatedRecord.save();

    if (!savedRecord) {
      throw new NotFoundException('User save failed');
    }

    createdUser.role.userId = await savedRecord._id;

    await createdUser.save();

    // const popuUser = await this.userModel
    //   .findById(createdUser._id)
    //   .populate('role.userId')
    //   .exec();

    return createdUser;
    // return popuUser;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }
    const existingUser = await this.findOneUser(id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} update failed`);
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<UserResponseDto> {
    const existingUser = await this.findOneUser(id);

    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new NotFoundException(`User with id ${id} delete failed`);
    }

    let relatedRecord;
    if (deletedUser.role.userType === 'student') {
      relatedRecord = await this.studentModel.findByIdAndDelete(
        deletedUser.role.userId,
      );
    } else if (deletedUser.role.userType === 'teacher') {
      relatedRecord = await this.teacherModel.findByIdAndDelete(
        deletedUser.role.userId,
      );
    }

    if (!relatedRecord) {
      throw new NotFoundException('Delete related record failed');
    }

    return deletedUser;
  }
}
