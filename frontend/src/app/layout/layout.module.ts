import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { LandingComponent } from '../pages/landing/landing.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { LayoutRoutes } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SuvsComponent } from '../pages/suvs/suvs.component';
import { SearchComponent } from '../pages/search/search.component';
import { PromotionsComponent } from '../pages/promotions/promotions.component';
import { BookingComponent } from '../pages/booking/booking.component';
import { BookingModalComponent } from '../pages/booking/booking-modal/booking-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    SuvsComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    // NgChartsModule,
    RouterModule.forChild(LayoutRoutes),
  ]
})
export class LayoutModule { }

