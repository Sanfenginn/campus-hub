import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ClassRequestDto } from './dtos/class.request.dto';
import { ClassResponseDto } from './dtos/class.response.dto';
import { UpdateClassDto } from './dtos/update.class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel('Class') private readonly classModel: Model<ClassResponseDto>,
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

    return deletedClass;
  }
}
