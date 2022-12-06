import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingListComponent } from '../pages/booking/booking-list/booking-list.component';
import { BookingModalComponent } from '../pages/booking/booking-modal/booking-modal.component';
import { BookingComponent } from '../pages/booking/booking.component';
import { CarProdComponent } from '../pages/car-prod/car-prod.component';
import { CreateComponent } from '../pages/create/create.component';
import { EditUserComponent } from '../pages/edit-user/edit-user.component';
import { HatchbackComponent } from '../pages/hatchback/hatchback.component';
import { LandingComponent } from '../pages/landing/landing.component';
import { LoginComponent } from '../pages/login/login.component';

import { PromotionsComponent } from '../pages/promotions/promotions.component';


import { SedenComponent } from '../pages/seden/seden.component';
import { SuvsComponent } from '../pages/suvs/suvs.component';
import { UsersComponent } from '../pages/users/users.component';
import { ProfileComponent } from '../profile/profile.component';
import { EditCarComponent } from '../pages/edit-car/edit-car.component';

export const LayoutRoutes: Routes = [
  {  path: '',      component: LandingComponent },
  {  path: 'seden',      component: SedenComponent },
  {  path: 'suvs',      component: SuvsComponent },
  {  path: 'suvs',      component: SuvsComponent },
  {  path: 'seden',      component: SedenComponent },
  {  path: 'hatchback',      component: HatchbackComponent },
  {  path: 'booking',      component: BookingListComponent },
  {  path: 'booking/:id',      component: BookingComponent },
  {  path: 'promotion',      component: PromotionsComponent },
  {  path: 'profile',      component: ProfileComponent },
  {  path: 'profile',      component: ProfileComponent },
  // { path: 'post', redirectTo: 'post/car-prod', pathMatch: 'full'},
  { path: 'carlist', component: CarProdComponent },
  { path: 'editCar/:id', component: EditCarComponent},
  //{ path: 'post/:postId/view', component: ViewComponent },
  { path: 'car', component: CreateComponent },
  {  path: 'users',      component: UsersComponent },
  {  path: 'users/:id',      component: EditUserComponent },
  // {  path: 'editbooking/:id',      component: BookingModalComponent }

];