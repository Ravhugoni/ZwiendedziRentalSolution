import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HatchbackComponent } from '../pages/hatchback/hatchback.component';
import { BookingComponent } from '../pages/booking/booking.component';
import { LandingComponent } from '../pages/landing/landing.component';

import { PromotionsComponent } from '../pages/promotions/promotions.component';


import { SedenComponent } from '../pages/seden/seden.component';
import { SuvsComponent } from '../pages/suvs/suvs.component';

export const LayoutRoutes: Routes = [
  {  path: '',      component: LandingComponent },
  {  path: 'suvs',      component: SuvsComponent },
  {  path: 'seden',      component: SedenComponent },
  {  path: 'hatchback',      component: HatchbackComponent },
  {  path: 'booking',      component: BookingComponent },
  {  path: 'pro',      component: PromotionsComponent },

];