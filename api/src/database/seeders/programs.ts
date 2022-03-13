import { CreateProgramDto } from '@dto/program.dto';

export const programs: CreateProgramDto[] = [
  {
    name: 'Express Wash',
    options: [
      {
        price: 2,
        name: 'Exterior Wash',
        mini_bus: 3,
        pickup: 2,
        sedan: 0,
        suv: 1,
      },
      {
        price: 2,
        name: 'Spot-free Rinse',
        mini_bus: 3,
        pickup: 2,
        sedan: 0,
        suv: 1,
      },
      {
        price: 2,
        name: 'Spot-free Thermal Dry',
        mini_bus: 3,
        pickup: 2,
        sedan: 0,
        suv: 1,
      },
    ],
  },
  {
    name: 'Supreme Wash',
    options: [
      {
        price: 2,
        name: 'Rain Shield',
        mini_bus: 3,
        pickup: 2,
        sedan: 0,
        suv: 1,
      },
      {
        price: 2,
        name: 'Triple Foam',
        mini_bus: 3,
        pickup: 2,
        sedan: 0,
        suv: 1,
      },
    ],
  },
  {
    name: 'Dressing',
    options: [
      {
        price: 2,
        name: 'Tire Dressing',
        mini_bus: 3,
        pickup: 2,
        sedan: 0,
        suv: 1,
      },
    ],
  },
  {
    name: 'Vacuum',
    options: [
      {
        price: 2,
        name: 'Vacuum cleaning',
        mini_bus: 3,
        pickup: 2,
        sedan: 0,
        suv: 1,
      },
      {
        price: 2,
        name: 'Window wiping',
        mini_bus: 3,
        pickup: 2,
        sedan: 0,
        suv: 1,
      },
    ],
  },
];
