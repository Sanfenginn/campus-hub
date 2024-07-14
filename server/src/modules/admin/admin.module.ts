import { Module } from '@nestjs/common';
import { UserModule } from '../admin/user/user.module';
import { CourseModule } from '../admin/course/course.module';

@Module({
  imports: [UserModule, CourseModule],
})
export class AdminModule {}
