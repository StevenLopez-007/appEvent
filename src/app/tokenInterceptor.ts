import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor  implements HttpInterceptor{
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(public authService:AuthService) {}
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        if(this.authService.getJwt()){
            req= this.addToken(req,this.authService.getJwt());
        }
        return next.handle(req).pipe(catchError(error=>{
            if(error instanceof HttpErrorResponse && error.status ===401){
                return this.handle401Error(req,next);
            }
            else{
                return throwError(error)
            }
        }));
    }

private handle401Error(request: HttpRequest<any>, next: HttpHandler):Observable<any> {
  if (!this.isRefreshing) {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.authService.refreshToken().pipe(
      switchMap((token: any) => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next(token['accesstoken']);
        return next.handle(this.addToken(request, token['accesstoken']));
      }));

  } else {
    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => {
        return next.handle(this.addToken(request, jwt));
      }));
  }
}

    private addToken(req:HttpRequest<any>,token:string){
        if(req.url.search('/api/v1/notifications')===-1){
            return req.clone({
                setHeaders:{
                    'a-token':token,
                    'Access-Control-Allow-Origin': '*'
                },
            })
        }
        return req
    }
}