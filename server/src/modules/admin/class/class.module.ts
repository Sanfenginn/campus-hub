import { Module } from '@nestjs/common';
import { ClassSchema } from './schemas/class.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassResolver } from './class.resolver';
import { ClassService } from './class.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Class', schema: ClassSchema }]),
  ],
  providers: [ClassResolver, ClassService],
})
export class ClassModule {}
