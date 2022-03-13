import { Schema } from 'mongoose';

export const OrderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    car_type: String,
    options: {
      type: [
        {
          _id: false,
          name: String,
          price: Number,
        },
      ],
    },
    price: Number,
    discount: Number,
    total_price: Number,
  },
  { timestamps: true }
);
