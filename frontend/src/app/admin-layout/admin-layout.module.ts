import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutes } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { AdminLandingComponent } from '../pages/admin-landing/admin-landing.component';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from '../shared/admin-header/admin-header.component';
import { UsersComponent } from '../pages/admin-landing/users/users.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CarsComponent } from '../pages/admin-landing/cars/cars.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    SideBarComponent,
    AdminHeaderComponent,
    AdminLandingComponent,
    UsersComponent,
    CarsComponent,
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    // AdminLayoutRoutingModule
    RouterModule.forChild(AdminLayoutRoutes),
  ]
})
export class AdminLayoutModule { }
