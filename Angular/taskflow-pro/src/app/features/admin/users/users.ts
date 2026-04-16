import { Component, OnInit } from '@angular/core';
import { UserWithStats } from '../../../models/user.model';
import { UserService } from '../../../core/services/user.service';
import { TaskService } from '../../../core/services/task.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-users',
  standalone:false,
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  users: UserWithStats[] = [];
  filteredUsers: UserWithStats[] = [];

  searchText: string = '';
  filterType: string = 'all';

  currentUser: any;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadUser();
  }

  loadUser() {
    const users = this.userService.getUsers();
    const tasks = this.taskService.getTasks();

    this.users = users.map((user: any) => {

      const userTasks = tasks.filter((t: any) => t.userId == user.id);

      const totalTasks = userTasks.length;
      const completedTasks = userTasks.filter((t: any) => t.completed).length;
      const pendingTasks = totalTasks - completedTasks;

      return {
        ...user,
        totalTasks,
        completedTasks,
        pendingTasks
      };
    });

    this.applyFilters();
  }

  toggleBlock(user: UserWithStats) {

    if (this.currentUser.id === user.id) {
      alert("You can't block yourself");
      return;
    }

    this.userService.toggleBlock(user.id); //  clean
    this.loadUser();
  }

  deleteUser(userId: number) {

    if (this.currentUser.id === userId) {
      alert("You can't delete yourself");
      return;
    }

    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    this.userService.deleteUser(userId);     //  user delete
    this.taskService.deleteTasksByUser(userId); //  task delete

    this.loadUser();
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => {

      const matchesSearch =
        user.username.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesFilter =
        this.filterType === 'all' ||
        (this.filterType === 'active' && !user.isBlocked) ||
        (this.filterType === 'blocked' && user.isBlocked);

      return matchesSearch && matchesFilter;
    });
  }
}