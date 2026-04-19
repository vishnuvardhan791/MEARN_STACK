import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-user-dashboard',
  standalone:false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {

  totalTasks = 0;
  assignedTasks = 0;
  submittedTasks = 0;
  approvedTasks = 0;
  overdueTasks = 0;

  currentUser: any;
  userChart: any;

  subscriptions: Subscription[] = [];

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.currentUser = this.authService.getCurrentUser();

    this.loadStats();
    this.renderChart();

    this.subscriptions.push(
      this.taskService.taskChanged.subscribe(() => {
        this.loadStats();
        this.renderChart();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.userChart) this.userChart.destroy();
  }

  loadStats() {
    const stats = this.taskService.getTaskStatsByUser(this.currentUser.id);

    this.totalTasks = stats.total;
    this.assignedTasks = stats.assigned;
    this.submittedTasks = stats.submitted;
    this.approvedTasks = stats.approved;
    this.overdueTasks = stats.overdue;
  }

  renderChart() {
    const canvas = document.getElementById('userTaskChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.userChart) this.userChart.destroy();

    this.userChart = new Chart(ctx, {
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
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: getComputedStyle(document.body).getPropertyValue('--text')
            }
          }
        }
      }
    });
  }
}