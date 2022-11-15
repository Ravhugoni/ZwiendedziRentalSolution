import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Booking } from '../model/booking';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3001/bookings';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  REST_API: string = 'http://localhost:3001';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http : HttpClient) { }

    // Get all objects
  GetList() {
    return this.http.get(this.REST_API + '/company');
  }

 
}



