import { ActivityModel } from '@model/activity';
import { CreateActivityDto } from '@dto/activity.dto';
import { ActivitySchema } from '@schema/activity.schema';
import { FilterQuery, Types } from 'mongoose';
import { Repository } from './base.repository';

export class ActivityRepository extends Repository<
  ActivityModel,
  CreateActivityDto
> {
  private static Instance: ActivityRepository;

  private constructor() {
    super('Activity', ActivitySchema);
  }

  static get instance() {
    if (!this.Instance) {
      this.Instance = new ActivityRepository();
    }
    return this.Instance;
  }

  getActivities(id?: string) {
    const filter: FilterQuery<ActivityModel> = {};

    if (id) {
      filter._id = { $gt: new Types.ObjectId(id) };
    }

    return this.model.find(filter).limit(20);
  }
}
