import { createComponent, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {NgToastModule} from 'ng-angular-popup';
import { SedenComponent } from './pages/seden/seden.component';
import { HatchbackComponent } from './pages/hatchback/hatchback.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingModalComponent } from './pages/booking/booking-modal/booking-modal.component';

import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './pages/booking/booking.component';
import { BookingListComponent } from './pages/booking/booking-list/booking-list.component';
import {DataTablesModule} from 'angular-datatables';
import { CreateComponent } from './pages/create/create.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    BookingComponent,
    SedenComponent,
    HatchbackComponent,
    ProfileComponent,
    HatchbackComponent,
    BookingModalComponent,
    BookingListComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgToastModule,
    BrowserAnimationsModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    NgbModule
  ],
  entryComponents: [BookingModalComponent],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
