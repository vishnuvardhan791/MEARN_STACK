import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  constructor(private router:Router){}
  signupForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,
                                  Validators.minLength(8)
    ]),
    confirmPassword: new FormControl('',Validators.required),
                                role:new FormControl('user')
  });

  passwordMatch():boolean {
    return this.signupForm.value.password === this.signupForm.value.confirmPassword;
  }

  onSubmit(){
    if(this.signupForm.valid && this.passwordMatch()){
      let users = JSON.parse(localStorage.getItem('users')||'[]');

      const newUser ={
        id:Date.now(),
        username:this.signupForm.value.username,
        password:this.signupForm.value.password,
        role : 'user',
        isBlocked:false
      };

      users.push(newUser);
      localStorage.setItem('users',JSON.stringify(users));

      alert('signup successfull');

      this.router.navigate(['/login']);

    }
    else{
      this.signupForm.markAllAsTouched();
    }
  }

  
}
