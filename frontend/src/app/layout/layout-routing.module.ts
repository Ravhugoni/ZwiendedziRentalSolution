import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../pages/landing/landing.component';
import { LoginComponent } from '../pages/login/login.component';

export const LayoutRoutes: Routes = [
  {  path: 'home',      component: LandingComponent },
];