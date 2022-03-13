export enum ActivityEnum {
  'order-created' = 'order-created',
  login = 'login',
  signup = 'signup',
  logout = 'logout',
}

export type ActivityType = keyof typeof ActivityEnum;
