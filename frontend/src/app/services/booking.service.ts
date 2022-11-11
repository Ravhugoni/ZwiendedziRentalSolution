import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../model/booking';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3001/bookings'

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http : HttpClient) { }


  getAll(): Observable<Booking[]> {
    return this.http.get<Booking[]>(baseUrl);
  }

  get(id: any): Observable<Booking> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
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



