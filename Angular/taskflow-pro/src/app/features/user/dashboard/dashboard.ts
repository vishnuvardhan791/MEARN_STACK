import { Component, OnInit } from '@angular/core';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  totalTasks=0;
  completedTasks=0;
  pendingTasks=0;

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')||'null');
    const tasks = JSON.parse(localStorage.getItem('tasks')||'[]');

    const userTasks = tasks.filter((t:Task)=> t.userId === currentUser?.id);

    this.totalTasks=userTasks.length;
    this.completedTasks=userTasks.filter((t:Task) => t.completed).length;
    this.pendingTasks=userTasks.filter((t:Task)=> !t.completed).length;
  }
}
