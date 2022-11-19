import { NgModule } from '@angular/core';
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
import { UsersComponent } from './pages/users/users.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';


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
    UsersComponent,
    EditUserComponent
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
    BsDatepickerModule.forRoot(),
    NgbModule
  ],
  entryComponents: [BookingModalComponent],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
