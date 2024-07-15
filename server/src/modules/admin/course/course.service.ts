import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CourseRequestDto } from './dtos/course.request.dto';
import { CourseResponseDto } from './dtos/course.response.dto';
import { UpdateCourseDto } from './dtos/update.course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('Course') private courseModel: Model<CourseResponseDto>,
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
    return deletedCourse;
  }
}
