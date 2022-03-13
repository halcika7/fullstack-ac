import { ActivityType } from '@interfaces/activity.interface';
import { Dictionary, ObjectId } from '@interfaces/common.interface';

export interface CreateActivityDto {
  activity_type: ActivityType;
  details: Dictionary;
  customer: ObjectId;
}
