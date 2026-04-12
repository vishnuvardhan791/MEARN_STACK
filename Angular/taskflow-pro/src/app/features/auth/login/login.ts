import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private router:Router){}

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(8)
    ])
  });


  onSubmit() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      const username = this.loginForm.value.username!;
      const password = this.loginForm.value.password!;

      const users = JSON.parse(localStorage.getItem('users')||'[]');

      const foundUser = users.find((user:any)=>
        user.username === username && user.password === password);

      if(foundUser){
        if(foundUser.isBlocked){
          alert('Your Account is Blocked by Admin');
          return;
        }

        localStorage.setItem('currentUser',JSON.stringify(foundUser));
        alert('Login Successfull');

        if(foundUser.role==='admin'){
          this.router.navigate(['/admin/dashboard']);
        }
        else{
          this.router.navigate(['/user/dashboard'])
        }
      }
      else{
        alert('Invalid Username or Password');
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
