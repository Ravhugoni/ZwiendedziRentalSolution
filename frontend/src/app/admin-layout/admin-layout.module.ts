import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutes } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { AdminLandingComponent } from '../pages/admin-landing/admin-landing.component';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from '../shared/admin-header/admin-header.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    SideBarComponent,
    AdminHeaderComponent,
    AdminLandingComponent,
  ],
  imports: [
    CommonModule,
    // AdminLayoutRoutingModule
    RouterModule.forChild(AdminLayoutRoutes),
  ]
})
export class AdminLayoutModule { }
