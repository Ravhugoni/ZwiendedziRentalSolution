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
import { ReportComponent } from '../pages/admin-landing/report/report.component';
import { CompanyComponent } from '../pages/admin-landing/company/company.component';
import { BookingComponent } from '../pages/admin-landing/booking/booking.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UploadsComponent } from '../pages/uploads/uploads.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    SideBarComponent,
    AdminHeaderComponent,
    AdminLandingComponent,
    UsersComponent,
    CarsComponent,
    ReportComponent,
    CompanyComponent,
    BookingComponent,
    
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    NgxSpinnerModule,
    // AdminLayoutRoutingModule
    RouterModule.forChild(AdminLayoutRoutes),
  ]
})
export class AdminLayoutModule { }
