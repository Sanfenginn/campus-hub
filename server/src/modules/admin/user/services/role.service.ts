// import { Injectable, NotFoundException } from '@nestjs/common';
// import { UserRequestDto } from '../dtos/user.request.dto';
// import { UserResponseDto } from '../dtos/user.response.dto';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model, Types } from 'mongoose';
// import { StudentResponseDto } from '../dtos/student.response.dto';
// import { TeacherResponseDto } from '../dtos/teacher.response.dto';
// import { AdminResponseDto } from '../dtos/admin.response.dto';
// import { UpdateUserDto } from '../dtos/update-user.dto';
// import { PasswordService } from './password.service';
// import { AssignToTeacherDto } from '../dtos/update-teacher.dto';
// import { CourseResponseDto } from '../../course/dtos/course.response.dto';
// import { AssignToStudentDto } from '../dtos/update-student.dto';

// @Injectable()
// export class RoleService {
//   constructor(
//     @InjectModel('Student')
//     private readonly studentModel: Model<StudentResponseDto>,
//     @InjectModel('Teacher')
//     private readonly teacherModel: Model<TeacherResponseDto>,
//     @InjectModel('Admin') private readonly adminModel: Model<AdminResponseDto>,
//     private readonly passwordService: PasswordService,
//   ) {}

//   async createRelatedRecord(
//     createUserDto: UserRequestDto,
//     userId: string,
//   ): Promise<void> {}
// }
