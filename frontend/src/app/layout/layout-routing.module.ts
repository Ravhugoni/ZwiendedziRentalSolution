import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../pages/landing/landing.component';

export const LayoutRoutes: Routes = [
  {  path: 'home',      component: LandingComponent },
];