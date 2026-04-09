import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  login(username:string,password:string){
    if(!username|| !password) return false;
    let expectedPassword=username.substring(0,4)+"123";

    if(password==expectedPassword){
      localStorage.setItem('user',username);
      return true;
    }
    return false;
  }

  isLoggedIn(){
    return localStorage.getItem('user')!==null;
  }

  logout(){
    localStorage.removeItem('user');
  }
}
