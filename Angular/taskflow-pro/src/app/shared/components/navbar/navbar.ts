import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  username: string = '';
  isDark: boolean = false;

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return user?.role === 'admin';
  }

  isUser(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return user?.role === 'user';
  }

  toggleTheme() {
  this.isDark = !this.isDark;

  if (this.isDark) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
  
}

ngOnInit(): void {
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  this.username = user?.username || 'Guest';

  const theme = localStorage.getItem('theme');

  if (theme === 'dark') {
    this.isDark = true;
    document.body.classList.add('dark-mode');
  } else {
    this.isDark = false;
    document.body.classList.remove('dark-mode');
  }
}

  applyTheme() {
    const body = document.body;

    if (this.isDark) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }
}
  