import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = '';
password: string = '';
errormsg: string = '';
  constructor(private auth:Auth,private router:Router){}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/products']);
    }
  }
  login(){
    this.errormsg='';
    if(this.auth.login(this.username,this.password)){
      alert('Nuv ravachuu mamaaa');
      this.router.navigate(['/products']);
    }
    else{
      this.errormsg='tappu password mama sarigga chusko';
    }
  }
  cancel(form: any){
    form.reset();
  }
  
}
