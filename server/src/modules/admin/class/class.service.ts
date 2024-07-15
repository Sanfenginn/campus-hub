import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ClassRequestDto } from './dtos/class.request.dto';
import { ClassResponseDto } from './dtos/class.response.dto';
import { UpdateClassDto } from './dtos/update.class.dto';
import { StudentResponseDto } from '../user/dtos/student.response.dto';
import { CourseResponseDto } from '../course/dtos/course.response.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel('Class') private readonly classModel: Model<ClassResponseDto>,
    @InjectModel('Student')
    private readonly studentModel: Model<StudentResponseDto>,
    @InjectModel('Course')
    private readonly courseModel: Model<CourseResponseDto>,
  ) {}

  async findAllClasses(): Promise<ClassResponseDto[]> {
    const allClasses = await this.classModel.find().exec();
    if (allClasses.length === 0) {
      throw new NotFoundException('Classes not found');
    }
    return allClasses;
  }

  async findOneClass(id: string): Promise<ClassResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid class id');
    }
    const foundClass = await this.classModel.findById(id);
    if (!foundClass) {
      throw new NotFoundException('Class not found');
    }
    return foundClass;
  }

  async createClass(
    createClassDto: ClassRequestDto,
  ): Promise<ClassResponseDto> {
    const newClass = new this.classModel(createClassDto);
    if (!newClass) {
      throw new NotFoundException('Class not created');
    }
    const createdClass = await newClass.save();
    if (!createdClass) {
      throw new NotFoundException('Class save failed');
    }

    if (createdClass.students && createdClass.students.length > 0) {
      createdClass.students.forEach(async (studentId) => {
        await this.studentModel.findByIdAndUpdate(
          studentId,
          {
            studentClass: createdClass._id,
          },
          { new: true },
        );
      });
    }

    if (createdClass.courses && createdClass.courses.length > 0) {
      createdClass.courses.forEach(async (courseId) => {
        await this.courseModel.findByIdAndUpdate(
          courseId,
          {
            $addToSet: { studentClasses: createdClass._id },
          },
          { new: true },
        );
      });
    }
    return createdClass;
  }

  async updateClass(
    id: string,
    updateClassDto: UpdateClassDto,
  ): Promise<ClassResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid class id: ${id}`);
    }

    const existingClass = await this.findOneClass(id);
    if (!existingClass) {
      throw new NotFoundException('Class not found');
    }

    const updatedClass = await this.classModel.findByIdAndUpdate(
      id,
      updateClassDto,
      { new: true },
    );

    if (!updatedClass) {
      throw new NotFoundException('Class update failed');
    }

    if (updatedClass.students && updatedClass.students.length > 0) {
      updatedClass.students.forEach(async (studentId) => {
        await this.studentModel.findByIdAndUpdate(
          studentId,
          {
            studentClass: updatedClass._id,
          },
          { new: true },
        );
      });
    }

    if (updatedClass.courses && updatedClass.courses.length > 0) {
      updatedClass.courses.forEach(async (courseId) => {
        await this.courseModel.findByIdAndUpdate(
          courseId,
          {
            $addToSet: { studentClasses: updatedClass._id },
          },
          { new: true },
        );
      });
    }

    return updatedClass;
  }

  async deleteClass(id: string): Promise<ClassResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid class id');
    }

    const existingClass = await this.findOneClass(id);
    if (!existingClass) {
      throw new NotFoundException('Class not found');
    }

    const deletedClass = await this.classModel.findByIdAndDelete(id);
    if (!deletedClass) {
      throw new NotFoundException('Class delete failed');
    }

    if (deletedClass.students && deletedClass.students.length > 0) {
      deletedClass.students.forEach(async (studentId) => {
        await this.studentModel.findByIdAndUpdate(
          studentId,
          {
            studentClass: null,
          },
          { new: true },
        );
      });
    }

    if (deletedClass.courses && deletedClass.courses.length > 0) {
      deletedClass.courses.forEach(async (courseId) => {
        await this.courseModel.findByIdAndUpdate(
          courseId,
          {
            $pull: { studentClasses: deletedClass._id },
          },
          { new: true },
        );
      });
    }

    return deletedClass;
  }
}
