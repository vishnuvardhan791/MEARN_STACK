import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";


@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{
  constructor(private router:Router){}

  canActivate(): boolean {

      // console.log("AuthGuard running");
      const user = localStorage.getItem('currentUser');
      if(user){
        return true;
      }
      else{
        alert("please login first");
        this.router.navigate(['/login']);
        return false;
      }
  }
}
