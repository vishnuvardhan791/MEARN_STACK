import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Dashboard } from './components/dashboard/dashboard';
import { Products } from './components/products/products';
import { About } from './components/about/about';
import { Favorites } from './components/favorites/favorites';
import { authGuard } from './guards/auth-guard';

const routes: Routes = [
  // public view
  {path:'',component:Login},
  {path:'signup',component:Signup},

  // protected view
  {
    path:'',component:MainLayout,
    canActivateChild:[authGuard],
    children:[
      {path:'dashboard',component:Dashboard},
      {path:'products',component:Products},
      {path:'about',component:About},
      {path:'favorites',component:Favorites}
    ]
  },

  // invalid route
  {path:'**',redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
