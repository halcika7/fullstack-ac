import { Document, Model, model, Schema } from 'mongoose';
import { ObjectId } from '@interfaces/common.interface';

export class Repository<T extends Document, U> {
  private readonly Model: Model<T>;

  constructor(
    private readonly collection: string,
    private readonly schema: Schema
  ) {
    this.Model = model<T>(this.collection, this.schema);
  }

  create(data: U) {
    return this.Model.create(data);
  }

  protected get model() {
    return this.Model;
  }

  getById(id: string | ObjectId) {
    return this.model.findById(id);
  }

  getMany() {
    return this.model.find();
  }

  deleteMany() {
    return this.model.deleteMany();
  }

  deleteById(id: string | ObjectId) {
    return this.model.findByIdAndDelete(id);
  }

  bulkWrite(data: U[]) {
    return this.model.insertMany(data);
  }
}
