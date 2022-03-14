import { AppState } from '../../store/reducer';

export const getState = (role = 'admin'): AppState => ({
  activities: {
    activities: [
      {
        _id: 'adiokaspod',
        activity_type: 'order-created',
        details: {},
        customer: 'sdfjiojdof',
        createdAt: new Date().toLocaleDateString(),
      },
    ],
    hasMore: true,
  },
  auth: {
    loading: false,
    token: 'token',
    user: {
      username: 'admin',
      role: role === 'admin' ? 'admin' : 'customer',
      _id: 'asdpoask',
      createdAt: new Date().toDateString(),
      first_name: 'name',
      last_name: 'name',
      money_spent: 0,
      number_of_orders: 9,
      updatedAt: new Date().toDateString(),
    },
  },
  dashboard: {
    orders: [
      {
        'Number of Orders': 2,
        month: 'Jan',
        monthNumber: 1,
      },
      {
        'Number of Orders': 2,
        month: 'dasdJan',
        monthNumber: 2,
      },
      {
        'Number of Orders': 2,
        month: 'Janfsg',
        monthNumber: 3,
      },
      {
        'Number of Orders': 2,
        month: 'Jadsfn',
        monthNumber: 4,
      },
      {
        'Number of Orders': 2,
        month: 'Jasdfsdfn',
        monthNumber: 5,
      },
      {
        'Number of Orders': 2,
        month: 'sdfsdf',
        monthNumber: 6,
      },
      {
        'Number of Orders': 2,
        month: 'dfsdf',
        monthNumber: 7,
      },
      {
        'Number of Orders': 2,
        month: 'cdscdc',
        monthNumber: 8,
      },
      {
        'Number of Orders': 2,
        month: 'sdcsdcwew',
        monthNumber: 9,
      },
      {
        'Number of Orders': 2,
        month: 'gerwg',
        monthNumber: 10,
      },
      {
        'Number of Orders': 2,
        month: 'ewrgerg',
        monthNumber: 11,
      },
      {
        'Number of Orders': 2,
        month: 'wegwerger',
        monthNumber: 12,
      },
    ],
    stat: {
      money_discount: 0,
      money_earned: 0,
      number_of_customers: 0,
      number_of_given_discounts: 0,
    },
  },
  orders: {
    hasMore: false,
    orders: [
      {
        _id: 'ksdo',
        car_type: 'mini_bus',
        createdAt: new Date().toDateString(),
        customer: 'sadjioas',
        discount: 10,
        options: [
          {
            name: 'name',
            price: 1,
          },
        ],
        price: 20,
        total_price: 18,
      },
    ],
  },
  profile: {},
  programs: {
    programs: [
      {
        _id: 'asdpoaskd',
        createdAt: new Date().toDateString(),
        name: 'name',
        options: [
          {
            _id: 'asdpksaopd',
            name: 'jsdoijkas',
            mini_bus: 1,
            sedan: 1,
            suv: 1,
            pickup: 1,
            price: 5,
          },
        ],
      },
    ],
  },
});
