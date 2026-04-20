import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private storageKey = 'users';

  userChanged = new Subject<void>();

  // ================= GET USERS =================
  getUsers(): User[] {
    let users: User[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    // ✅ Ensure admin exists
    const adminExists = users.some(user => user.role === 'admin');

    if (!adminExists) {
      const admin: User = {
        id: Date.now(),
        username: 'Kalali Vishnu Vardhan Goud',
        password: 'Vishnu@7910',
        role: 'admin',
        isBlocked: false
      };

      users = [admin, ...users];
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    return users;
  }

  // ================= SAVE USERS =================
  private saveUsers(users: User[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    this.userChanged.next();
  }

  // ================= ADD USER =================
  addUser(userData: any): boolean {
    // ✅ Validation
    if (!userData.username || !userData.password) return false;

    const users = this.getUsers();

    // ✅ Prevent duplicate username
    const exists = users.some(u => u.username === userData.username);
    if (exists) return false;

    const newUser: User = {
      id: Date.now(),
      username: userData.username,
      password: userData.password,
      role: 'user',
      isBlocked: false
    };

    users.push(newUser);
    this.saveUsers(users);

    return true;
  }

  // ================= UPDATE USERS =================
  updateUsers(users: User[]) {
    this.saveUsers(users);
  }

  // ================= TOGGLE BLOCK =================
  toggleBlock(userId: number) {
    const users = this.getUsers().map(user => {
      // ❌ Prevent blocking admin
      if (user.id === userId && user.role !== 'admin') {
        return { ...user, isBlocked: !user.isBlocked };
      }
      return user;
    });

    this.saveUsers(users);
  }

  // ================= DELETE USER =================
  deleteUser(userId: number) {
    const users = this.getUsers().filter(user => {
      // ❌ Prevent deleting admin
      if (user.role === 'admin') return true;
      return user.id !== userId;
    });

    this.saveUsers(users);
  }

  // ================= GET BY USERNAME =================
  getUserByUsername(username: string): User | undefined {
    return this.getUsers().find(user => user.username === username);
  }

}