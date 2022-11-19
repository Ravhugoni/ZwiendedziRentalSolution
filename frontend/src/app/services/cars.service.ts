import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  REST_API: string = 'http://localhost:3001';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient:HttpClient) { }
  GetCarsByCategory(carDetails:any): Observable<any> {
    let API_URL = this.REST_API + '/cars';
    return this.httpClient.post(API_URL, carDetails)
  }
}
