import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRequestDto } from './dtos/user.request.dto';
import { UserResponseDto } from './dtos/user.response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StudentResponseDto } from './dtos/student.response.dto';
import { TeacherResponseDto } from './dtos/teacher.response.dto';
import { AdminResponseDto } from './dtos/admin.response.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PasswordService } from './services/password.service';
import { AssignToTeacherDto } from './dtos/update-teacher.dto';
import { CourseResponseDto } from '../course/dtos/course.response.dto';
import { AssignToStudentDto } from './dtos/update-student.dto';
import { ClassResponseDto } from '../class/dtos/class.response.dto';
import { FindUsersRequestDto } from './dtos/find-users.request.dto';
import { DeleteUsersResponseDto } from './dtos/delete-users-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserResponseDto>,
    @InjectModel('Student')
    private readonly studentModel: Model<StudentResponseDto>,
    @InjectModel('Teacher')
    private readonly teacherModel: Model<TeacherResponseDto>,
    @InjectModel('Admin') private readonly adminModel: Model<AdminResponseDto>,
    private readonly passwordService: PasswordService,
    @InjectModel('Course')
    private readonly courseModel: Model<CourseResponseDto>,
    @InjectModel('Class') private readonly classModel: Model<ClassResponseDto>,
  ) {}

  async findAllUsers(
    condition?: FindUsersRequestDto,
  ): Promise<UserResponseDto[]> {
    const query: any = { $and: [{ 'role.userType': { $ne: 'admin' } }] };
    if (condition.Role) {
      query.$and.push({ 'role.userType': condition.Role });
    } else if (condition.Name) {
      query.$and.push({
        $or: [
          { 'name.firstName': { $regex: condition.Name, $options: 'i' } },
          { 'name.lastName': { $regex: condition.Name, $options: 'i' } },
        ],
      });
    } else if (condition.Account) {
      query.$and.push({
        account: { $regex: condition.Account, $options: 'i' },
      });
    }

    const allUsers = await this.userModel
      .find(query)
      .select('-password')
      .exec();

    // console.log('allUsers:', allUsers);

    // if (allUsers.length === 0) {
    //   throw new NotFoundException('Users not found');
    // }

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
    const hashedPassword = await this.passwordService.hashPassword(
      createUserDto.password,
    );

    createUserDto.password = hashedPassword;

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
    let relatedRecord;
    if (updatedUser.role.userType === 'student') {
      relatedRecord = await this.studentModel.findByIdAndUpdate(
        updatedUser.role.userId,
        { name: updateUserDto.name },
        { new: true },
      );
    } else if (updatedUser.role.userType === 'teacher') {
      relatedRecord = await this.teacherModel.findByIdAndUpdate(
        updatedUser.role.userId,
        { name: updateUserDto.name },
        { new: true },
      );
    } else if (updatedUser.role.userType === 'admin') {
      relatedRecord = await this.adminModel.findByIdAndUpdate(
        updatedUser.role.userId,
        { name: updateUserDto.name },
        { new: true },
      );
    }
    if (!relatedRecord) {
      throw new NotFoundException('Update related record failed');
    }
    return updatedUser;
  }

  async deleteUser(ids: string[]): Promise<DeleteUsersResponseDto> {
    await Promise.all(
      ids.map(async (id) => {
        if (!Types.ObjectId.isValid(id)) {
          throw new NotFoundException(`Invalid ID ${id} format`);
        }
        const existingUser = await this.findOneUser(id);
        if (!existingUser) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
      }),
    );
    const results = await Promise.all(
      ids.map(async (id) => {
        const deletedUser = await this.userModel.findByIdAndDelete(id);
        if (!deletedUser) {
          throw new NotFoundException(`User with id ${id} delete failed`);
        }

        let relatedRecord;
        if (deletedUser.role.userType === 'student') {
          relatedRecord = await this.studentModel.findByIdAndDelete(
            deletedUser.role.userId,
          );
          if (relatedRecord) {
            await this.classModel.findByIdAndUpdate(
              relatedRecord.studentClass,
              {
                $pull: { students: relatedRecord._id },
              },
            );
          }
        } else if (deletedUser.role.userType === 'teacher') {
          relatedRecord = await this.teacherModel.findByIdAndDelete(
            deletedUser.role.userId,
          );
          if (relatedRecord) {
            await Promise.all(
              relatedRecord.courses.map((course) =>
                this.courseModel.findByIdAndUpdate(course, {
                  instructor: null,
                }),
              ),
            );
            await Promise.all(
              relatedRecord.studentClasses.map((studentClass) =>
                this.classModel.findByIdAndUpdate(studentClass, {
                  $pull: { teachers: relatedRecord._id },
                }),
              ),
            );
          }
        }
        if (!relatedRecord) {
          throw new NotFoundException('Delete related record failed');
        }
        return deletedUser;
      }),
    );

    return { message: 'Users deleted successfully', results };
  }

  async assignToTeacher(
    id: string,
    updateTeacherDto: AssignToTeacherDto,
  ): Promise<TeacherResponseDto> {
    const existingTeacher = await this.teacherModel.findById(id);
    if (!existingTeacher) {
      throw new NotFoundException(`Teacher with id ${id} not found`);
    }
    const AssignedTeacher = await this.teacherModel.findByIdAndUpdate(
      id,
      updateTeacherDto,
      { new: true },
    );
    if (!AssignedTeacher) {
      throw new NotFoundException(`Teacher with id ${id} update failed`);
    }
    AssignedTeacher.courses.map(async (course) => {
      await this.courseModel.findByIdAndUpdate(course, {
        instructor: AssignedTeacher._id,
      });
    });
    return AssignedTeacher;
  }

  async assignToStudent(
    id: string,
    updateStudentDto: AssignToStudentDto,
  ): Promise<StudentResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }

    const existingStudent = await this.studentModel.findById(id);
    if (!existingStudent) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    const assignedStudent = await this.studentModel.findByIdAndUpdate(
      id,
      { studentClass: updateStudentDto.studentClass },
      { new: true },
    );
    if (!assignedStudent) {
      throw new NotFoundException(`Student with id ${id} update failed`);
    }

    await this.classModel.findByIdAndUpdate(assignedStudent.studentClass, {
      $addToSet: { students: assignedStudent._id },
    });

    return assignedStudent;
  }
}
