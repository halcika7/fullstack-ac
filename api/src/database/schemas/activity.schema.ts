import { ActivityEnum } from '@interfaces/activity.interface';
import { Schema } from 'mongoose';

export const ActivitySchema = new Schema(
  {
    activity_type: {
      type: String,
      enum: Object.values(ActivityEnum),
    },
    details: { type: Schema.Types.Mixed, _id: false },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
