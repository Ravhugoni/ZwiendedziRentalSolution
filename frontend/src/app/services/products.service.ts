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

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

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

  updateCar(id:number,carDetails:any): Observable<any> {
    let API_URL = this.REST_API + '/products/cars/'+ id;
    return this.httpClient.put(API_URL, carDetails).pipe(
      catchError(this.errorHandler)
    )
  }

  deleteCar(id:number): Observable<any> {
    let API_URL = this.REST_API + '/cars/'+ id;
    return this.httpClient.delete(API_URL).pipe(
      catchError(this.errorHandler)
    )
  }

  GetNumCars() {
    return this.httpClient.get(this.REST_API + '/num/cars');
  }

  //getting cars by categories
  GetAllByCat(){
    
    let API_URL = this.REST_API+ '/num/carByCat';
    return this.httpClient.get(API_URL).pipe();
  }

  //getting cars in the current month
  GetAllByDate(){
    
    let API_URL = this.REST_API+ '/num/carByDate';
    return this.httpClient.get(API_URL).pipe();
  }
  

}
