import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Booking } from '../model/booking';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3001/bookings';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  REST_API: string = 'http://localhost:3001';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http : HttpClient) { }

    // Get all objects
  GetList() {
    return this.http.get(this.REST_API + '/bookings');
  }

  AddBooking(bookingDetails:any): Observable<any> {
    let API_URL = this.REST_API + '/bookings';
    return this.http.post(API_URL, bookingDetails).pipe();
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data).pipe();
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${baseUrl}?title=${title}`);
  }
}



