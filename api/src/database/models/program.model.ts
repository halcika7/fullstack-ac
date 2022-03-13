import { CreateProgramDto } from '@dto/program.dto';
import { BaseModel } from './base.model';

export interface ProgramModel extends CreateProgramDto, BaseModel {}
