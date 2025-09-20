import { PartialType } from '@nestjs/mapped-types';
import { companyDTO } from './companyDTO';

export class UpdateAuthDto extends PartialType(companyDTO) {}
