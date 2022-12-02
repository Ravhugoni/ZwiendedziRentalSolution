import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLandingComponent } from '../pages/admin-landing/admin-landing.component';
import { ReportComponent } from '../pages/admin-landing/report/report.component';

export const AdminLayoutRoutes: Routes = [
  {  path: '',      component: AdminLandingComponent },
  {  path: 'mon-rt',      component: ReportComponent },

];