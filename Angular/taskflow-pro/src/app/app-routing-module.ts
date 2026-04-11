import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Auth
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';

// User
import { Dashboard as UserDashboard } from './features/user/dashboard/dashboard';
import { Tasks as UserTasks } from './features/user/tasks/tasks';

// Admin
import { Dashboard as AdminDashboard } from './features/admin/dashboard/dashboard';
import { Users } from './features/admin/users/users';
import { Tasks as AdminTasks } from './features/admin/tasks/tasks';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  { path: 'user/dashboard', component: UserDashboard },
  { path: 'user/tasks', component: UserTasks },

  { path: 'admin/dashboard', component: AdminDashboard },
  { path: 'admin/users', component: Users },
  { path: 'admin/tasks', component: AdminTasks }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}