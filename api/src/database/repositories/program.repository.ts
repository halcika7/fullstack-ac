import { ProgramModel } from '@model/program.model';
import { CreateProgramDto } from '@dto/program.dto';
import { ProgramSchema } from '@schema/program.schema';
import { Repository } from './base.repository';

export class ProgramRepository extends Repository<
  ProgramModel,
  CreateProgramDto
> {
  private static Instance: ProgramRepository;

  private constructor() {
    super('Program', ProgramSchema);
  }

  static get instance() {
    if (!this.Instance) {
      this.Instance = new ProgramRepository();
    }
    return this.Instance;
  }

  update(id: string, data: CreateProgramDto) {
    return this.model.findByIdAndUpdate(id, data);
  }

  delete(ids: string[]) {
    return this.model.deleteMany({ _id: { $in: ids } });
  }
}
