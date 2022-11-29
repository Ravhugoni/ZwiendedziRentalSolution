import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLandingComponent } from '../pages/admin-landing/admin-landing.component';

export const AdminLayoutRoutes: Routes = [
  {  path: '',      component: AdminLandingComponent }
];