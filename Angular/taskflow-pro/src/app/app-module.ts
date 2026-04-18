import { NgModule, provideBrowserGlobalErrorListeners  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Navbar } from './shared/components/navbar/navbar';
import { TaskCard } from './shared/components/task-card/task-card';

import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';

import { Dashboard as AdminDashboard } from './features/admin/dashboard/dashboard';
import { Tasks as AdminTasks } from './features/admin/tasks/tasks';
import { Users } from './features/admin/users/users';

import { Dashboard as UserDashboard } from './features/user/dashboard/dashboard';
import { Tasks as UserTasks } from './features/user/tasks/tasks';


@NgModule({
  declarations: [
    App,
    Navbar,
    TaskCard,

    Login,
    Signup,

    AdminDashboard,
    AdminTasks,
    Users,

    UserDashboard,
    UserTasks
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule {}