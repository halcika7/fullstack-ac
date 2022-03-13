import { ActivityEnum, ActivityType } from '@interfaces/activity.interface';
import { Dictionary, ObjectId } from '@interfaces/common.interface';
import { ActivityRepository } from '@repository/activity.repository';

export class ActivityService {
  private static Instance: ActivityService;

  private readonly activityRepository = ActivityRepository.instance;

  private constructor() {}

  static get instance() {
    if (!this.Instance) {
      this.Instance = new ActivityService();
    }
    return this.Instance;
  }

  createNewSignUp(customer: ObjectId) {
    return this.createBasic(customer, ActivityEnum.signup);
  }

  createNewLogin(customer: ObjectId) {
    return this.createBasic(customer, ActivityEnum.login);
  }

  createLogout(customer: ObjectId) {
    return this.createBasic(customer, ActivityEnum.logout);
  }

  private createBasic(customer: ObjectId, activity_type: ActivityType) {
    return this.activityRepository.create({
      customer,
      activity_type,
      details: {},
    });
  }

  createOrder(customer: ObjectId, details: Dictionary) {
    return this.activityRepository.create({
      activity_type: ActivityEnum['order-created'],
      customer,
      details,
    });
  }
}
