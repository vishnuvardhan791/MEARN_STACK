import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../models/user.model';

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
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl<string>('', Validators.required),
    role: new FormControl<'user'>('user')
  });

  strengthClass = '';

  // ================= PASSWORD MATCH =================
  passwordMatch(): boolean {
    return this.signupForm.value.password === this.signupForm.value.confirmPassword;
  }

  // ================= SUBMIT =================
  onSubmit() {
    if (this.signupForm.invalid || !this.passwordMatch()) {
      this.signupForm.markAllAsTouched();
      return;
    }

    // ✅ SAFE extraction (NO null issue now)
    const username = this.signupForm.value.username!;
    const password = this.signupForm.value.password!;

    // 🔥 Get users
    const users = this.userService.getUsers();

    // 🔥 Duplicate check
    const exists = users.some(u => u.username === username);
    if (exists) {
      alert('Username already exists');
      return;
    }

    // ✅ STRICT TYPE SAFE USER
    const newUser: User = {
      id: Date.now(),
      username: username,
      password: password,
      role: 'user',
      isBlocked: false
    };

    // 🔥 Save
    users.push(newUser);
    this.userService.updateUsers(users);

    alert('Signup successful');

    this.router.navigate(['/login']);
  }

  // ================= ANIMATIONS =================
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

  // ================= PASSWORD STRENGTH =================
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