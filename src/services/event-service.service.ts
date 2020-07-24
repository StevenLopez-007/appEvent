import { Injectable,Inject } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import {catchError } from 'rxjs/operators';
import { Ievent } from '../model/ievent';
import { Observable, throwError } from 'rxjs';
import { refreshToken } from './refreshToken.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(@Inject('API_BASE_URL') private url:string,private http: HttpClient,private refreshAccessToken:refreshToken) { }

  public getEventPerUser():Observable<Ievent[]> {
      return this.http.get<Ievent[]>(`${this.url}event/getEventPerUser`)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      if(error.status==401){
        
      }
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
