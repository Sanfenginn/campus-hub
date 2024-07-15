import { Module } from '@nestjs/common';
import { ClassSchema } from './schemas/class.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassResolver } from './class.resolver';
import { ClassService } from './class.service';
import { StudentSchema } from '../user/schemas/student.schema';
import { CourseSchema } from '../course/schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Class', schema: ClassSchema },
      { name: 'Student', schema: StudentSchema },
      { name: 'Course', schema: CourseSchema },
    ]),
  ],
  providers: [ClassResolver, ClassService],
})
export class ClassModule {}
