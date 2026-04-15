import { Component, OnInit } from '@angular/core';
import { UserWithStats } from '../../../models/user.model';


@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit{

  users:UserWithStats[]=[];
  searchText: string = '';
  filterType: string = 'all'; 
  filteredUsers: UserWithStats[] = [];
 
  currentUser: any;

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.loadUser();
  }
  loadUser(){
    const users = JSON.parse(localStorage.getItem('users')||'[]');
    const tasks = JSON.parse(localStorage.getItem('tasks')||'[]');

    this.users = users.map((user:any)=> {
      const userTasks = tasks.filter((t:any)=>t.userId == user.id);

      const totalTasks = userTasks.length;
      const completedTasks = userTasks.filter((t:any)=> t.completed).length;
      const pendingTasks = totalTasks-completedTasks;

      return{
        ...user,
        totalTasks,
        completedTasks,
        pendingTasks
      };
    });

    this.applyFilters();
  }
  toggleBlock(user: UserWithStats) {

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const updatedUsers = users.map((u: any) => {
    if (u.id == user.id) {
      return {
        ...u,
        isBlocked: !u.isBlocked
      };
    }
    return u;
  });

  localStorage.setItem('users', JSON.stringify(updatedUsers));
  this.loadUser();
}

  deleteUser(userId: number) {


  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  if (currentUser.id === userId) {
    alert("You can't delete yourself");
    return;
  }

  const confirmDelete = confirm('Are you sure you want to delete this user?');
  if (!confirmDelete) return;

 
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const updatedUsers = users.filter((u: any) => u.id !== userId);
  localStorage.setItem('users', JSON.stringify(updatedUsers));


  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const updatedTasks = tasks.filter((t: any) => t.userId !== userId);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));

  this.loadUser();
}
  applyFilters() {

  this.filteredUsers = this.users.filter(user => {

  const matchesSearch =
      user.username.toLowerCase().includes(this.searchText.toLowerCase());

  const matchesFilter =
      this.filterType == 'all' ||
      (this.filterType == 'active' && !user.isBlocked) ||
      (this.filterType == 'blocked' && user.isBlocked);

    return matchesSearch && matchesFilter;
  });

}

}
