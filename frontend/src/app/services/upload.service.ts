import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

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

 
  //After creating Uploads in the database change the path
  // Get all documents
  GetList() {
    return this.httpClient.get(this.REST_API + '/uploads');
  }

  getDocxById(id:number) :Observable<any>{
    let API_URL = this.REST_API + '/uploads' +id;
    return this.httpClient.get(this.REST_API + '/uploads');
  }
   //After creating Uploads in the database change the path
  uploadDocx(uploadDetails:any): Observable<any> {
    let API_URL = this.REST_API + '/uploads';
    return this.httpClient.post(API_URL, uploadDetails)
  }


   //After creating Uploads in the database change the path
  updateDocx(id:number,uploadDetails:any): Observable<any> {
    let API_URL = this.REST_API + '/uploads/'+ id;
    return this.httpClient.put(API_URL, uploadDetails).pipe(
      catchError(this.errorHandler)
    )
  }


}
