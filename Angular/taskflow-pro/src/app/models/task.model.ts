export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  deadline: string;
  userId: number;

  status: 'assigned' | 'submitted' | 'approved'; 
}