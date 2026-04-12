import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  username:string='';

  constructor(private router:Router){}

  ngOnInit(): void{
      const user =JSON.parse(localStorage.getItem('currentUser')||'null');
      this.username=user?.username ||'Guest';

    }
    logout(){
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
}
