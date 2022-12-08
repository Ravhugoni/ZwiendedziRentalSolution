import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLandingComponent } from '../pages/admin-landing/admin-landing.component';
import { ReportComponent } from '../pages/admin-landing/report/report.component';
import { BookingListComponent } from '../pages/booking/booking-list/booking-list.component';
import { BookingModalComponent } from '../pages/booking/booking-modal/booking-modal.component';
import { BookingComponent } from '../pages/booking/booking.component';
import { CarProdComponent } from '../pages/car-prod/car-prod.component';
import { CreateComponent } from '../pages/create/create.component';
import { EditCarComponent } from '../pages/edit-car/edit-car.component';
import { EditUserComponent } from '../pages/edit-user/edit-user.component';
import { UploadsComponent } from '../pages/uploads/uploads.component';
import { UsersComponent } from '../pages/users/users.component';

export const AdminLayoutRoutes: Routes = [
  {  path: '',      component: AdminLandingComponent },
  {  path: 'mon-rt',      component: ReportComponent },
  { path: 'booking',      component: BookingListComponent },
  { path: 'booking/:id',      component: BookingComponent },
  { path: 'carlist', component: CarProdComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id',      component: EditUserComponent },
  { path: 'editbooking/:id',      component: BookingModalComponent },
  { path: 'editCar/:id', component: EditCarComponent},
  { path: 'car', component: CreateComponent },
  { path: 'upload', component: UploadsComponent },
];