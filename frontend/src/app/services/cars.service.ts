import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Cars } from '../cars/cars';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CarsService {

  REST_API: string = 'http://localhost:3001';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

  constructor(private httpClient:HttpClient) { }
  GetCarsByCategory(carDetails:any): Observable<any> {
    let API_URL = this.REST_API + '/products/cars';
    return this.httpClient.post(API_URL, carDetails)
  }

  findCategory(category:string): Observable<any> {
  
    return this.httpClient.get(this.REST_API + '/products/carsByCat' + category)
  
  }
  

  GetCars(carDetails:any): Observable<any> {
    let API_URL = this.REST_API + '/products/cars';
    return this.httpClient.get(API_URL, carDetails).pipe(
      catchError(this.errorHandler)
    )
  }

  postCar(carDetails:Cars): Observable<any> {
    let API_URL = this.REST_API + '/products/cars';
    return this.httpClient.post(API_URL, carDetails).pipe(
      catchError(this.errorHandler)
    )
  }

  updateCar(id:number,carDetails:Cars): Observable<any> {
    let API_URL = this.REST_API + '/products/cars/id'+ id;
    return this.httpClient.put(API_URL, carDetails).pipe(
      catchError(this.errorHandler)
    )
  }

  deleteCar(id:number): Observable<any> {
    let API_URL = this.REST_API + '/cars/id' + id;
    return this.httpClient.delete(API_URL).pipe(
      catchError(this.errorHandler)
    )
  }
}
