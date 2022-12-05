import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  // Node/Express API
  REST_API: string = 'http://localhost:3001';
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }
  // Add

  AddNotification(userDetails:any): Observable<any> {
    let API_URL = this.REST_API + '/notification';
    return this.httpClient.post(API_URL, userDetails)
  }

  getNotificationById(id: any, data: any): Observable<any> {
    let API_URL = this.REST_API+ '/profile/notificationById' + id;
    return this.httpClient.get(API_URL, data)
  }

  GetAllNotification() {
    return this.httpClient.get(this.REST_API + '/notification');
  }
  
  updateNotification(id: any, data: any): Observable<any> {
    let API_URL = this.REST_API + '/notification/'+id;
    return this.httpClient.patch(API_URL, data).pipe();
  }  
}
