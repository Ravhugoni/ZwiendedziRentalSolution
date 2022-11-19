import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from '../pages/booking/booking.component';
import { HatchbackComponent } from '../pages/hatchback/hatchback.component';
import { LandingComponent } from '../pages/landing/landing.component';
import { LoginComponent } from '../pages/login/login.component';

import { PromotionsComponent } from '../pages/promotions/promotions.component';


import { SedenComponent } from '../pages/seden/seden.component';
import { SuvsComponent } from '../pages/suvs/suvs.component';
import { ProfileComponent } from '../profile/profile.component';

export const LayoutRoutes: Routes = [
  {  path: '',      component: LandingComponent },
  {  path: 'seden',      component: SedenComponent },
  {  path: 'suvs',      component: SuvsComponent },
  {  path: 'suvs',      component: SuvsComponent },
  {  path: 'seden',      component: SedenComponent },
  {  path: 'hatchback',      component: HatchbackComponent },
  {  path: 'booking/:id',      component: BookingComponent },
  {  path: 'promotion',      component: PromotionsComponent },
  {  path: 'profile',      component: ProfileComponent }

];