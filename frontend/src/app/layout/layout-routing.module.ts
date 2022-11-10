import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from '../pages/booking/booking.component';
import { LandingComponent } from '../pages/landing/landing.component';

export const LayoutRoutes: Routes = [
  {  path: '',      component: LandingComponent },
  {  path: 'booking',      component: BookingComponent },
];