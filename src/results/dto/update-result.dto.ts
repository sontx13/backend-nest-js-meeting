import { PartialType } from '@nestjs/mapped-types';
import { CreateResultAppDto } from './create-result.dto';

export class UpdateResultDto extends PartialType(CreateResultAppDto) {}
