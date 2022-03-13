import { UserSchema } from '@schema/user.schema';
import { UserModel } from '@model/user.model';

import { CreateUserDto, UpdateUserDto } from '@dto/user.dto';
import { ObjectId } from '@interfaces/common.interface';
import { Repository } from './base.repository';

export class UserRepository extends Repository<UserModel, CreateUserDto> {
  private static Instance: UserRepository;

  private constructor() {
    super('User', UserSchema);
  }

  static get instance() {
    if (!this.Instance) {
      this.Instance = new UserRepository();
    }
    return this.Instance;
  }

  getByUsername(username: string) {
    return super.model.findOne({ username });
  }

  updateUserProfile(id: ObjectId, data: UpdateUserDto) {
    return super.model
      .findByIdAndUpdate(id, data)
      .select('first_name last_name username');
  }

  incrementAfterOrder(id: ObjectId, total: number) {
    return this.model.findByIdAndUpdate(id, {
      $inc: { number_of_orders: 1, money_spent: total },
    });
  }
}
