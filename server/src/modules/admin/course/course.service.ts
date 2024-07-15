import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CourseRequestDto } from './dtos/course.request.dto';
import { CourseResponseDto } from './dtos/course.response.dto';
import { UpdateCourseDto } from './dtos/update.course.dto';
import { TeacherResponseDto } from '../user/dtos/teacher.response.dto';
import { ClassResponseDto } from '../class/dtos/class.response.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('Course') private courseModel: Model<CourseResponseDto>,
    @InjectModel('Teacher') private teacherModel: Model<TeacherResponseDto>,
    @InjectModel('Class') private classModel: Model<ClassResponseDto>,
  ) {}

  async findAllCourses(): Promise<CourseResponseDto[]> {
    const allCourses = await this.courseModel.find().exec();
    if (allCourses.length === 0) {
      throw new NotFoundException('Courses not found');
    }
    return allCourses;
  }

  async findOneCourse(id: string): Promise<CourseResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid course ID');
    }
    const newCourse = await this.courseModel.findById(id);
    if (!newCourse) {
      throw new NotFoundException('Course not found');
    }
    return newCourse;
  }

  async createCourse(
    createCourse: CourseRequestDto,
  ): Promise<CourseResponseDto> {
    const newCourse = new this.courseModel(createCourse);
    if (!newCourse) {
      throw new NotFoundException('Course not created');
    }
    const createdCourse = await newCourse.save();
    if (!createdCourse) {
      throw new NotFoundException('Course save failed');
    }

    if (createdCourse.instructor) {
      await this.teacherModel.findByIdAndUpdate(
        createdCourse.instructor,
        {
          $addToSet: { courses: createdCourse._id },
        },
        { new: true },
      );

      if (
        createdCourse.studentClasses &&
        createdCourse.studentClasses.length > 0
      ) {
        createdCourse.studentClasses.forEach(async (classId) => {
          await this.classModel.findByIdAndUpdate(
            classId,
            {
              $addToSet: { courses: createdCourse._id },
            },
            { new: true },
          );
        });
      }
    }

    return createdCourse;
  }

  async updateCourse(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid course ID');
    }
    const existingCourse = await this.findOneCourse(id);
    if (!existingCourse) {
      throw new NotFoundException('Course not found');
    }
    const updatedCourse = await this.courseModel.findByIdAndUpdate(
      id,
      updateCourseDto,
      { new: true },
    );
    if (!updatedCourse) {
      throw new NotFoundException('Course update failed');
    }

    if (updateCourseDto.instructor) {
      await this.teacherModel.findByIdAndUpdate(
        updateCourseDto.instructor,
        {
          $addToSet: { courses: updatedCourse._id },
        },
        { new: true },
      );

      if (
        updateCourseDto.studentClasses &&
        updateCourseDto.studentClasses.length > 0
      ) {
        updateCourseDto.studentClasses.forEach(async (classId) => {
          await this.classModel.findByIdAndUpdate(
            classId,
            {
              $addToSet: { courses: updatedCourse._id },
            },
            { new: true },
          );
        });
      }
    }

    return updatedCourse;
  }

  async deleteCourse(id: string): Promise<CourseResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid course ID');
    }
    const existingCourse = await this.findOneCourse(id);
    if (!existingCourse) {
      throw new NotFoundException('Course not found');
    }
    const deletedCourse = await this.courseModel.findByIdAndDelete(id);
    if (!deletedCourse) {
      throw new NotFoundException('Course delete failed');
    }

    if (deletedCourse.instructor) {
      await this.teacherModel.findByIdAndUpdate(
        deletedCourse.instructor,
        {
          $pull: { courses: deletedCourse._id },
        },
        { new: true },
      );

      if (
        deletedCourse.studentClasses &&
        deletedCourse.studentClasses.length > 0
      ) {
        deletedCourse.studentClasses.forEach(async (classId) => {
          await this.classModel.findByIdAndUpdate(
            classId,
            {
              $pull: { courses: deletedCourse._id },
            },
            { new: true },
          );
        });
      }
    }

    return deletedCourse;
  }
}
