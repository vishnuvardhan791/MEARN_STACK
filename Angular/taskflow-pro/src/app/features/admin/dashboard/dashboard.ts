import { Component, DoCheck } from '@angular/core';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements DoCheck{
  totalUsers=0;
  totalTasks=0;
  completedTasks=0;
  pendingTasks=0;

  ngDoCheck(): void {
    const users = JSON.parse(localStorage.getItem('users')||'[]');
    const tasks = JSON.parse(localStorage.getItem('tasks')||'[]');

    this.totalUsers=users.length;
    this.totalTasks=tasks.length;

    this.completedTasks=tasks.filter((t:Task) => t.completed).length;
    this.pendingTasks= tasks.filter((t:Task) => !t.completed).length;
  }
}
