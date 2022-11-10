import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from '../pages/booking/booking.component';
import { LandingComponent } from '../pages/landing/landing.component';
<<<<<<< HEAD
import { SedenComponent } from '../pages/seden/seden.component';
import { SuvsComponent } from '../pages/suvs/suvs.component';

export const LayoutRoutes: Routes = [
  {  path: '',      component: LandingComponent },
<<<<<<< HEAD
  {  path: 'suvs',      component: SuvsComponent },
  {  path: 'seden',      component: SedenComponent },
  {  path: 'hatchback',      component: HatchbackComponent },
=======
  {  path: 'booking',      component: BookingComponent },
>>>>>>> origin/main
=======
import { ProfileComponent } from '../profile/profile.component';

export const LayoutRoutes: Routes = [
  {  path: '',      component: LandingComponent },
  
  {  path: 'profile',      component: ProfileComponent }
>>>>>>> seden-page
];