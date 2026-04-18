import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl('', Validators.required),
    role: new FormControl('user')
  });

  strengthClass = '';

  passwordMatch(): boolean {
    return this.signupForm.value.password === this.signupForm.value.confirmPassword;
  }

  onSubmit() {
    if (this.signupForm.valid && this.passwordMatch()) {

      const newUser = {
        id: Date.now(),
        username: this.signupForm.value.username,
        password: this.signupForm.value.password,
        role: 'user',
        isBlocked: false
      };

      // 🔥 Duplicate check
      const users = this.userService.getUsers();
      const exists = users.some(u => u.username === newUser.username);

      if (exists) {
        alert('Username already exists');
        return;
      }

      // 🔥 Save via service
      users.push(newUser);
      this.userService.updateUsers(users);

      alert('Signup successful');

      this.router.navigate(['/login']);

    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  // 🎭 Animations
  onUsernameFocus() {
    document.getElementById('character')?.classList.remove('password-mode');
  }

  onPasswordFocus() {
    document.getElementById('character')?.classList.add('password-mode');
  }

  onBlur() {
    const el = document.getElementById('character');
    el?.classList.remove('look-left', 'look-right', 'password-mode');
  }

  onTyping(event: any) {
    const value = event.target.value;
    const el = document.getElementById('character');

    if (!el) return;

    if (value.length % 2 === 0) {
      el.classList.add('look-left');
      el.classList.remove('look-right');
    } else {
      el.classList.add('look-right');
      el.classList.remove('look-left');
    }
  }

  checkStrength() {
    const value = this.signupForm.value.password || '';

    if (value.length < 5) {
      this.strengthClass = 'weak';
    } else if (value.length < 8) {
      this.strengthClass = 'medium';
    } else {
      this.strengthClass = 'strong';
    }
  }
}