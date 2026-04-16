import { Component, OnInit } from '@angular/core';
import { Task } from '../../../models/task.model';
import { User } from '../../../models/user.model';
import { TaskService } from '../../../core/services/task.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-admin-tasks',
  standalone:false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {

  searchText: string = '';
  filterStatus: string = 'all';
  sortBy: string = 'none';

  filteredTasks: Task[] = [];
  users: User[] = [];
  tasks: Task[] = [];

  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    priority: 'low',
    deadline: '',
    userId: 0,
    status: 'assigned' 
  };

  constructor(private taskService: TaskService,private userService:UserService) {}

  ngOnInit(): void {
  this.loadData();

  this.taskService.taskChanged.subscribe(() => {
    this.loadData();
  });

  this.userService.userChanged.subscribe(() => {
    this.loadData();
  });
}

  loadData() {
  this.tasks = this.taskService.getTasks();
  this.users = this.userService.getUsers();

  this.applyFilters(); 
}

  addTask() {
    const task: Task = {
      ...this.newTask,
      id: Date.now(),
      userId: Number(this.newTask.userId),
      status: 'assigned'
    };

    this.taskService.addTask(task);

    this.newTask = {
      id: 0,
      title: '',
      description: '',
      priority: 'low',
      deadline: '',
      userId: 0,
      status: 'assigned'
    };

    this.loadData();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.loadData();
  }

  approveTask(id: number) {
    const tasks = this.taskService.getTasks();
    const task = tasks.find(t => t.id === id);

    if (!task) return;

    const updatedTask: Task = {
      ...task,
      status: 'approved'
    };

    this.taskService.updateTask(updatedTask);
    this.loadData();
  }

  getUsername(userId: number) {
    const user = this.users.find(u => u.id == userId);
    return user ? user.username : 'Unknown';
  }

  isOverdue(task: Task): boolean {
    return task.status !== 'approved' && new Date(task.deadline) < new Date();
  }
  applyFilters() {

    let temp = [...this.tasks];

    if (this.searchText.trim()) {
      temp = temp.filter(task =>
        task.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    if (this.filterStatus !== 'all') {
      temp = temp.filter(task => task.status === this.filterStatus);
    }

    if (this.sortBy === 'deadline') {
      temp.sort((a, b) =>
        new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
    }

    if (this.sortBy === 'priority') {
      const priorityOrder: any = { high: 1, medium: 2, low: 3 };
      temp.sort((a, b) =>
        priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    }

    this.filteredTasks = temp;
  }
}