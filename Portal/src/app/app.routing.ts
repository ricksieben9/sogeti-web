import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {AuthGuard} from './_guards/auth.guard';
import {Role} from './_models/role';
import {LoginComponent} from './auth/login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'login',
    component: LoginComponent
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '/dashboard' }
];

export const routing = RouterModule.forRoot(appRoutes);
