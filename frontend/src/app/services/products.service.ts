import { Injectable } from '@angular/core';
// import { User } from './User';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  // Node/Express API
  REST_API: string = 'http://localhost:3001';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }
  // Add

  GetCarsByCategory(category:any): Observable<any> {
    category = {
      category: "SUV"
  }
    let API_URL = this.REST_API+ '/products/carsByCat';
    return this.httpClient.get("http://localhost:3001/products/carsByCat",category);
  }

    // Get all objects
  GetList() {
    return this.httpClient.get(this.REST_API + '/products/cars');
  }
}
