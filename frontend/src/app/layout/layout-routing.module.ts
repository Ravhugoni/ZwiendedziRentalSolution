import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from '../pages/booking/booking.component';
import { LandingComponent } from '../pages/landing/landing.component';
import { SedenComponent } from '../pages/seden/seden.component';
import { SuvsComponent } from '../pages/suvs/suvs.component';

export const LayoutRoutes: Routes = [
  {  path: '',      component: LandingComponent },
  {  path: 'booking',      component: BookingComponent },
  {  path: 'seden',      component: SedenComponent },
  {  path: 'suvs',      component: SuvsComponent },
];