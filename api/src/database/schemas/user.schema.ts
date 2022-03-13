import { UserRoles } from '@enums/user-roles.enum';
import { Hash } from '@lib/hash.lib';
import { Schema } from 'mongoose';

const hash = Hash.instance;

export const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      required: true,
      default: UserRoles.customer,
    },
    number_of_orders: {
      type: Number,
      default: 0,
    },
    money_spent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        const obj = Object.entries(ret).filter(vals => vals[0] !== 'password');
        return Object.fromEntries(obj);
      },
      versionKey: false,
    },
  }
);

UserSchema.pre('save', async function fn(done) {
  if (this.isModified('password')) {
    const hashed = await hash.hash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});
