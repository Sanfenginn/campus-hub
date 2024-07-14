import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { StudentSchema } from './schemas/student.schema';
import { TeacherSchema } from './schemas/teacher.schema';
import { AdminSchema } from './schemas/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Student', schema: StudentSchema },
      { name: 'Teacher', schema: TeacherSchema },
      { name: 'Admin', schema: AdminSchema },
    ]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
