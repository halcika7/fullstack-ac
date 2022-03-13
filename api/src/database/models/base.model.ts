import { Document } from 'mongoose';
import { ObjectId } from '@interfaces/common.interface';

export interface BaseModel extends Document {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
