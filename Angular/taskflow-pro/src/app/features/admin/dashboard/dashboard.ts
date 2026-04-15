import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Task } from '../../../models/task.model';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  standalone:false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, AfterViewInit {

  totalUsers = 0;
  activeUsers = 0;
  blockedUsers = 0;

  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;

  taskChart: any;
  userChart: any;

  ngOnInit(): void {
    this.loadDashboard();
  }

  ngAfterViewInit(): void {
  this.renderTaskChart();
  this.renderUserChart();
}

  loadDashboard() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    this.totalUsers = users.length;
    this.activeUsers = users.filter((u: any) => !u.isBlocked).length;
    this.blockedUsers = users.filter((u: any) => u.isBlocked).length;

    this.totalTasks = tasks.length;
    this.completedTasks = tasks.filter((t: Task) => t.completed).length;
    this.pendingTasks = tasks.filter((t: Task) => !t.completed).length;
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
      labels: ['Done', 'Pending'],
      datasets: [{
        data: [this.completedTasks, this.pendingTasks],
        backgroundColor: ['#28a745', '#ffc107']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' 
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
        data: [this.activeUsers, this.blockedUsers],
        backgroundColor: ['#0d6efd', '#dc3545']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}
  }
