import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(@Inject('API_BASE_URL') private url, private http:HttpClient,private router :Router){}

    login(datosUser:object){
        this.http.post<any>(`${this.url}user/login`,{correo:datosUser['correo'],password:datosUser['password']},{withCredentials:true})
        .subscribe(token=>{
            this.storeToken(token['accesstoken']);
            this.router.navigate(['/']);
        })
    }

    getJwt(){
        return localStorage.getItem('a-token')
    }

    private storeToken(token:string){
        localStorage.setItem('a-token',token);
    }  
    
    refreshToken(){
        return this.http.get<any>(`${this.url}user/refreshAccessToken`,{withCredentials:true})
        .pipe(tap((token:any)=>{this.storeToken(token['accesstoken'])}))
    }

     isLoggedIn(){
        return !! this.getJwt();
    }
}