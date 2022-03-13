import { CreateActivityDto } from '@dto/activity.dto';
import { BaseModel } from './base.model';

export interface ActivityModel extends CreateActivityDto, BaseModel {}
