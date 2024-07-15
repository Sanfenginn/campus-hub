import { Module } from '@nestjs/common';
import { CourseSchema } from './schemas/course.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseResolver } from './course.resolver';
import { CourseService } from './course.service';
import { TeacherSchema } from '../user/schemas/teacher.schema';
import { ClassSchema } from '../class/schemas/class.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      { name: 'Teacher', schema: TeacherSchema },
      { name: 'Class', schema: ClassSchema },
    ]),
  ],
  providers: [CourseResolver, CourseService],
})
export class CourseModule {}
