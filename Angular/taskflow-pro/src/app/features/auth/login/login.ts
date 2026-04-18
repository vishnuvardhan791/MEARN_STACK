import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  showPassword = false;
  loading = false;
  loginError = false;
  success = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  onSubmit() {
  if (this.loginForm.valid) {

    this.loading = true;
    this.loginError = false;

    const username = this.loginForm.value.username!;
    const password = this.loginForm.value.password!;

    const users = this.userService.getUsers();

    const foundUser = users.find((user: any) =>
      user.username === username && user.password === password
    );

    this.loading = false;

    if (foundUser) {

      if (foundUser.isBlocked) {
        alert('Your Account is Blocked by Admin');
        return;
      }

      this.authService.setCurrentUser(foundUser);

      if (foundUser.role === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/user/dashboard']);
      }

    } else {
      this.loginError = true;

      // 🔥 FACE SHAKE
      const face = document.querySelector('.face');
      face?.classList.add('error-shake');

      setTimeout(() => {
        face?.classList.remove('error-shake');
      }, 400);
    }

  } else {
    this.loginForm.markAllAsTouched();
  }
}

  onUsernameFocus() {
  this.loginError = false;
  document.querySelector('.face')?.classList.remove('password-mode');
}

  onPasswordFocus() {
  this.loginError = false;
  document.querySelector('.face')?.classList.add('password-mode');
}

  onBlur() {
    document.querySelector('.face')?.classList.remove(
      'look-left',
      'look-right',
      'password-mode'
    );
  }

  onTyping(event: any) {
  this.loginError = false; // 🔥 VERY IMPORTANT

  const value = event.target.value;
  const face = document.querySelector('.face');

  if (!face) return;

  if (value.length % 2 === 0) {
    face.classList.add('look-left');
    face.classList.remove('look-right');
  } else {
    face.classList.add('look-right');
    face.classList.remove('look-left');
  }
}
}