import { LoginDto } from '@dto/auth.dto';
import { CreateUserDto } from '@dto/user.dto';
import { UserRoles } from '@enums/user-roles.enum';
import { BadRequest, NotFound, Unauthorized } from '@exceptions';
import { ObjectId } from '@interfaces/common.interface';
import { Hash } from '@lib/hash.lib';
import { JWT } from '@lib/jwt.lib';
import { FacilityStatRepository } from '@repository/facility-stat.repository';
import { UserRepository } from '@repository/user.repository';
import { ActivityService } from './activity.service';

export class AuthService {
  private static Instance: AuthService;

  private readonly userRepository = UserRepository.instance;

  private readonly activityService = ActivityService.instance;

  private readonly facilityStatRepository = FacilityStatRepository.instance;

  private readonly hashUtil = Hash.instance;

  private readonly jwt = JWT.instance;

  private constructor() {}

  static get instance() {
    if (!this.Instance) {
      this.Instance = new AuthService();
    }
    return this.Instance;
  }

  async register(data: CreateUserDto) {
    const customer = await this.userRepository.create(data);
    await Promise.all([
      this.activityService.createNewSignUp(customer._id),
      this.facilityStatRepository.incrementCustomers(),
    ]);
    return customer;
  }

  async login(data: LoginDto) {
    const user = await this.userRepository.getByUsername(data.username);

    if (!user) {
      throw new BadRequest({ message: 'Invalid credentials' });
    }

    const equal = await this.hashUtil.verify(user.password, data.password);

    if (!equal) {
      throw new BadRequest({ message: 'Invalid credentials' });
    }

    if (user.role === UserRoles.customer) {
      this.activityService.createNewLogin(user._id);
    }

    return this.getTokens(user._id);
  }

  async refresh(token: string) {
    const decoded = this.jwt.decodeToken(token);

    if (!decoded) {
      throw new Unauthorized({ message: 'Empty token' });
    }

    this.jwt.verifyToken(token, true);

    const user = await this.userRepository.getById(decoded.id);

    if (!user) {
      throw new NotFound({ message: 'User does not exist' });
    }

    return this.getTokens(user._id);
  }

  private getTokens(id: ObjectId) {
    return {
      accessToken: this.jwt.signToken(id),
      refreshToken: this.jwt.signToken(id, true),
    };
  }
}
