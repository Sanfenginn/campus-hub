import { Module } from '@nestjs/common';
import { CourseSchema } from './schemas/course.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseResolver } from './course.resolver';
import { CourseService } from './course.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
  ],
  providers: [CourseResolver, CourseService],
})
export class CourseModule {}
