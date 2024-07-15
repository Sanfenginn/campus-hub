import { Module } from '@nestjs/common';
import { UserModule } from '../admin/user/user.module';
import { CourseModule } from '../admin/course/course.module';
import { ClassModule } from '../admin/class/class.module';

@Module({
  imports: [UserModule, CourseModule, ClassModule],
})
export class AdminModule {}
