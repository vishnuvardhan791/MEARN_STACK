export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}

export interface UserWithStats extends User {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}