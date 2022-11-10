import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../pages/landing/landing.component';
import { PromotionsComponent } from '../pages/promotions/promotions.component';

export const LayoutRoutes: Routes = [
  {  path: '',      component: LandingComponent },
  {  path: 'promotion',      component: PromotionsComponent },
];