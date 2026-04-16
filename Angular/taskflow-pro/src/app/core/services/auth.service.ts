import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private storageKey = 'currentUser';

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
  }


  setCurrentUser(user: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }
}