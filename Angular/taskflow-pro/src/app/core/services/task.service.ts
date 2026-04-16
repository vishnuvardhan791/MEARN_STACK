import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private storageKey = 'tasks';

  taskChanged = new Subject<void>();

  // 🔥 GET ALL TASKS
  getTasks(): Task[] {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  // 🔥 FIX: ensure every task has status
  return tasks.map((task: Task) => ({
    ...task,
    status: task.status || 'assigned'
  }));
}

  // 🔥 SAVE (COMMON METHOD)
  private saveTasks(tasks: Task[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    this.taskChanged.next();
  }

  // 🔥 ADD TASK (DEFAULT STATUS)
  addTask(task: Task): void {
    const tasks = this.getTasks();

    const newTask: Task = {
      ...task,
      status: 'assigned' // 🔥 ALWAYS START HERE
    };

    tasks.push(newTask);
    this.saveTasks(tasks);
  }

  // 🔥 UPDATE TASK
  updateTask(updatedTask: Task): void {
    const tasks = this.getTasks().map(t =>
      t.id === updatedTask.id ? updatedTask : t
    );

    this.saveTasks(tasks);
  }

  // 🔥 DELETE TASK
  deleteTask(id: number): void {
    const tasks = this.getTasks().filter(t => t.id !== id);
    this.saveTasks(tasks);
  }

  // 🔥 DELETE TASKS BY USER
  deleteTasksByUser(userId: number): void {
    const tasks = this.getTasks().filter(t => t.userId !== userId);
    this.saveTasks(tasks);
  }

  // 🔥 GET TASKS BY USER
  getTasksByUser(userId: number): Task[] {
    return this.getTasks().filter(t => t.userId === userId);
  }

  // 🔥 GLOBAL TASK STATS (ADMIN DASHBOARD)
  getTaskStats() {
    const tasks = this.getTasks();
    const now = new Date();

    return {
      total: tasks.length,

      assigned: tasks.filter(t => t.status === 'assigned').length,

      submitted: tasks.filter(t => t.status === 'submitted').length,

      approved: tasks.filter(t => t.status === 'approved').length,

      overdue: tasks.filter(t =>
        t.status !== 'approved' && new Date(t.deadline) < now
      ).length
    };
  }

  // 🔥 USER TASK STATS
  getTaskStatsByUser(userId: number) {
    const tasks = this.getTasks();
    const now = new Date();

    const userTasks = tasks.filter(t => t.userId === userId);

    return {
      total: userTasks.length,

      assigned: userTasks.filter(t => t.status === 'assigned').length,

      submitted: userTasks.filter(t => t.status === 'submitted').length,

      approved: userTasks.filter(t => t.status === 'approved').length,

      overdue: userTasks.filter(t =>
        t.status !== 'approved' && new Date(t.deadline) < now
      ).length
    };
  }

  // 🔥 HELPER METHODS (VERY USEFUL)

  submitTask(id: number) {
    const tasks = this.getTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const updatedTask: Task = {
      ...task,
      status: 'submitted'
    };

    this.updateTask(updatedTask);
  }

  approveTask(id: number) {
    const tasks = this.getTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const updatedTask: Task = {
      ...task,
      status: 'approved'
    };

    this.updateTask(updatedTask);
  }
}