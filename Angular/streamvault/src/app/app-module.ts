import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Navbar } from './components/navbar/navbar';
import { Sidebar } from './components/sidebar/sidebar';
import { Dashboard } from './components/dashboard/dashboard';
import { Products } from './components/products/products';
import { About } from './components/about/about';
import { MainLayout } from './layouts/main-layout/main-layout';
import { FormsModule } from '@angular/forms';
import { Favorites } from './components/favorites/favorites';

@NgModule({
  declarations: [
    App,
    Login,
    Signup,
    Navbar,
    Sidebar,
    Dashboard,
    Products,
    About,
    MainLayout,
    Favorites,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
