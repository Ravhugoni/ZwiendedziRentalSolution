import { Injectable } from '@angular/core';
// import { User } from './User';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  // Node/Express API
  REST_API: string = 'http://localhost:3001';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }
  // Add

  AddUser(userDetails:any): Observable<any> {
    let API_URL = this.REST_API + '/users/register';
    return this.httpClient.post(API_URL, userDetails)
  }

  UserLogin(loginDetails:any): Observable<any> {
    let API_URL = this.REST_API + '/users/login';
    return this.httpClient.post(API_URL, loginDetails)
  }

  GetUserByEmail(email:any): Observable<any> {
    let API_URL = this.REST_API+ '/profile/usersByEmail';
    return this.httpClient.get(API_URL, email)
  }

  GetAllUsers() {
    return this.httpClient.get(this.REST_API + '/users');
  }
  
  updateProfile(id: any, data: any): Observable<any> {
    let API_URL = this.REST_API + '/profile/users/:id';
    return this.httpClient.put(API_URL, data).pipe();
  }

//   // Get single object
//   GetListByID(id:any): Observable<any> {
//     let API_URL = this.REST_API+ '/list/'+ id;
//     return this.httpClient.get(API_URL, { headers: this.httpHeaders })
//       .pipe(map((res: any) => {
//           return res || {}
//         }),
//         catchError(this.handleError)
//       )
//   }

//   deleteTask(id:any): Observable<any> {
//     let API_URL = ${this.REST_API}/list/${id};
//     return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
//         catchError(this.handleError)
//       )
//   }
// updateTask(id:any, data:any): Observable<any> {
//     let API_URL = ${this.REST_API}/list/${id};
//     return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
//       .pipe(
//         catchError(this.handleError)
//       )
//   }
 
//   completeTask(id:any, data:any): Observable<any> {
//     let API_URL = ${this.REST_API}/list/${id};
//     return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
//       .pipe(
//         catchError(this.handleError)
//       )
//   }

  // Error 
  
  // handleError(error: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Handle client error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Handle server error
  //     errorMessage = Error Code: ${error.status}\nMessage: ${error.message};
  //   }
  //   console.log(errorMessage);
  //   return throwError(errorMessage);
  // }

}