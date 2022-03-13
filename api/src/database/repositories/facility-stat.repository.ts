import { FacilityStatDto } from '@dto/facility-stat.dto';
import { FacilityStatModel } from '@model/facility-stat.model';
import { FacilityStatSchema } from '@schema/facility-stat.schema';
import { UpdateQuery } from 'mongoose';
import { Repository } from './base.repository';

type Update = UpdateQuery<FacilityStatModel>;

export class FacilityStatRepository extends Repository<
  FacilityStatModel,
  FacilityStatDto
> {
  private static Instance: FacilityStatRepository;

  private constructor() {
    super('FacilityStat', FacilityStatSchema);
  }

  static get instance() {
    if (!this.Instance) {
      this.Instance = new FacilityStatRepository();
    }
    return this.Instance;
  }

  incrementCustomers() {
    return this.model.findOneAndUpdate(
      {},
      { $inc: { number_of_customers: 1 } }
    );
  }

  incrementAfterOrder(total: number, money_discount: number) {
    const update: Update = { $inc: { money_earned: total } };

    if (money_discount) {
      update.$inc = {
        ...update.$inc,
        number_of_given_discounts: 1,
        money_discount,
      };
    }

    return this.model.findOneAndUpdate({}, update);
  }
}
