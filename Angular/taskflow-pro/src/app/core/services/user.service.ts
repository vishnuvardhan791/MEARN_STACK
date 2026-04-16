import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private storageKey = 'users';

  userChanged = new Subject<void>();

  //  GET ALL USERS
  getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  //  SAVE USERS (COMMON METHOD)
  private saveUsers(users: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    this.userChanged.next();
  }

  //  UPDATE FULL LIST
  updateUsers(users: any[]) {
    this.saveUsers(users);
  }

  //  TOGGLE BLOCK
  toggleBlock(userId: number) {
    const users = this.getUsers().map(user => {
      if (user.id === userId) {
        return { ...user, isBlocked: !user.isBlocked };
      }
      return user;
    });

    this.saveUsers(users);
  }

  // DELETE USER
  deleteUser(userId: number) {
    const users = this.getUsers().filter(user => user.id !== userId);
    this.saveUsers(users);
  }
}