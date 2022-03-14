export interface Option {
  _id: string;
  name: string;
  price: number;
  sedan: number;
  pickup: number;
  suv: number;
  mini_bus: number;
}

export interface Program {
  _id: string;
  name: string;
  createdAt: string;
  options: Option[];
}

export interface State {
  programs: Program[];
  errors?: Partial<Program>;
  message?: string;
}

export type ProgramDto = Omit<Program, '_id' | 'createdAt'>;
