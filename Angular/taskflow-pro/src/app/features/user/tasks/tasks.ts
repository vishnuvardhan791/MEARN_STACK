import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../core/services/task.service';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit, OnDestroy {

  tasks: Task[] = [];
  currentUser: any;
  subscriptions: Subscription[] = [];

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadTasks();

    this.subscriptions.push(
      this.taskService.taskChanged.subscribe(() => {
        this.loadTasks();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadTasks() {
    if (!this.currentUser) return;
    this.tasks = this.taskService.getTasksByUser(this.currentUser.id);
  }


  submitTask(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    if (task.status !== 'assigned') return;

    const updatedTask: Task = {
      ...task,
      status: 'submitted'
    };

    this.taskService.updateTask(updatedTask);
  }

  isOverdue(task: Task): boolean {

    if (!task.deadline) return false;

    const now = new Date();
    const deadline = new Date(task.deadline);

    now.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    return deadline < now && task.status !== 'approved';
  }
}