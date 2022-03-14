export interface Activity {
  _id: string;
  activity_type: 'order-created' | 'login' | 'signup' | 'logout';
  details: Record<string, unknown>;
  customer: string;
  createdAt: string;
}

export interface State {
  activities: Activity[];
  last_seen?: string;
  hasMore: boolean;
}
