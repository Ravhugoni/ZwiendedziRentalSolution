import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../pages/landing/landing.component';
import { ProfileComponent } from '../profile/profile.component';

export const LayoutRoutes: Routes = [
  {  path: '',      component: LandingComponent },
  
  {  path: 'profile',      component: ProfileComponent }
];