import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs';
import Chart from 'chart.js/auto';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone:false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit, OnDestroy {


  totalUsers = 0;
  activeUsers = 0;
  blockedUsers = 0;

  totalTasks = 0;
  assignedTasks = 0;
  submittedTasks = 0;
  approvedTasks = 0;
  overdueTasks = 0;

  taskChart: any;
  userChart: any;

  subscriptions: Subscription[] = [];

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();

    this.subscriptions.push(
      this.taskService.taskChanged.subscribe(() => {
        this.loadDashboard();
      })
    );

    this.subscriptions.push(
      this.userService.userChanged.subscribe(() => {
        this.loadDashboard();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());

    if (this.taskChart) this.taskChart.destroy();
    if (this.userChart) this.userChart.destroy();
  }

  loadDashboard() {

  const users = this.userService.getUsers();
  const tasks = this.taskService.getTasks();

  this.totalUsers = users.length;
  this.activeUsers = users.filter(u => !u.isBlocked).length;
  this.blockedUsers = users.filter(u => u.isBlocked).length;

  this.totalTasks = tasks.length;

  const now = new Date();

  this.assignedTasks = tasks.filter(t => t.status === 'assigned').length;
  this.submittedTasks = tasks.filter(t => t.status === 'submitted').length;
  this.approvedTasks = tasks.filter(t => t.status === 'approved').length;

  this.overdueTasks = tasks.filter(
    (t: Task) => t.status !== 'approved' && new Date(t.deadline) < now
  ).length;

  setTimeout(() => {
    this.renderTaskChart();
    this.renderUserChart();
  }, 0);
}

  renderTaskChart() {
    const canvas = document.getElementById('taskChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.taskChart) this.taskChart.destroy();

    this.taskChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Assigned', 'Submitted', 'Approved', 'Overdue'],
        datasets: [{
          data: [
            this.assignedTasks,
            this.submittedTasks,
            this.approvedTasks,
            this.overdueTasks
          ],
          backgroundColor: [
            '#0d6efd', 
            '#ffc107', 
            '#198754', 
            '#dc3545'  
          ],
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 10
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 15
            }
          }
        }
      }
    });
  }
  renderUserChart() {
    const canvas = document.getElementById('userChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.userChart) this.userChart.destroy();

    this.userChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Active', 'Blocked'],
        datasets: [{
          data: [
            this.activeUsers,
            this.blockedUsers
          ],
          backgroundColor: [
            '#0d6efd',
            '#dc3545'
          ],
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 10
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 15
            }
          }
        }
      }
    });
  }
  
}