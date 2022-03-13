import { Schema } from 'mongoose';

export const FacilityStatSchema = new Schema(
  {
    number_of_customers: {
      type: Number,
      default: 0,
    },
    money_earned: {
      type: Number,
      default: 0,
    },
    number_of_given_discounts: {
      type: Number,
      default: 0,
    },
    money_discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
