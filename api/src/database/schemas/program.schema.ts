import { Schema } from 'mongoose';

export const ProgramSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    options: {
      type: [
        {
          _id: false,
          name: String,
          price: Number,
          sedan: Number,
          pickup: Number,
          suv: Number,
          mini_bus: Number,
        },
      ],
    },
  },
  { timestamps: true }
);
