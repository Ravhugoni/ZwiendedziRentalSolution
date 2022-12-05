import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Booking } from '../model/booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  REST_API: string = 'http://localhost:3001';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http : HttpClient) { }

    // Get all objects
  GetAvailable(data:any): Observable<any> {
    return this.http.get(this.REST_API + '/availableCars', data);
  }

  GetAvailableByCampany(data:any): Observable<any> {
    return this.http.get(this.REST_API + '/availableCarByCompany', data);
  }
 
}
