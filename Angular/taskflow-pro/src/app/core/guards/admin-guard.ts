import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";


@Injectable({
  providedIn:'root'
})

export class AdminGuard implements CanActivate{
  constructor(private router:Router){}

  canActivate():boolean{
    const user =JSON.parse(localStorage.getItem('currentUser')||'null');

    if(user && user.role==='admin'){
      return true;
    }
    else{
      alert('Access denied admin Only');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
