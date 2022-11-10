import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { LandingComponent } from '../pages/landing/landing.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LayoutRoutes } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SearchComponent } from '../pages/search/search.component';
import { BookingComponent } from '../pages/booking/booking.component';
import { BookingModalComponent } from '../pages/booking/booking-modal/booking-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    SearchComponent,
    BookingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
  ]
})
export class LayoutModule { }

