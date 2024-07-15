import { InputType, PartialType } from '@nestjs/graphql';
import { ClassRequestDto } from './class.request.dto';

@InputType()
export class UpdateClassDto extends PartialType(ClassRequestDto) {}
