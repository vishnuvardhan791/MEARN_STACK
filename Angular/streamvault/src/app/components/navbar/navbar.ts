import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css', 
})
export class Navbar {

  username:string ='';
  constructor(private auth:Auth,private router:Router){}
  ngOnInit(){
    const user = localStorage.getItem('user');
    this.username = user ? user:'';
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/'])
  }
}
