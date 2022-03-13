import { CreateProgramDto } from '@dto/program.dto';
import { BadRequest, NotFound } from '@exceptions';
import { ProgramRepository } from '@repository/program.repository';

export class ProgramService {
  private static Instance: ProgramService;

  private readonly programRepository = ProgramRepository.instance;

  private constructor() {}

  static get instance() {
    if (!this.Instance) {
      this.Instance = new ProgramService();
    }
    return this.Instance;
  }

  create(data: CreateProgramDto) {
    return this.programRepository.create(data);
  }

  getPrograms() {
    return this.programRepository.getMany();
  }

  async update(id: string, data: CreateProgramDto) {
    const program = await this.programRepository.update(id, data);

    if (!program) {
      throw new NotFound({ message: 'Program not found' });
    }

    return program;
  }

  async deletePrograms(ids: string[]) {
    const deleted = await this.programRepository.delete(ids);

    if (!deleted.deletedCount) {
      throw new BadRequest({ message: 'Nothing to delete' });
    }

    return 'ok';
  }

  async getProgram(id: string) {
    const program = await this.programRepository.getById(id);

    if (!program) {
      throw new NotFound({ message: 'Program not found' });
    }

    return program;
  }
}
