import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Iuser } from '../../model/iuser';
import { Observable,from } from 'rxjs';
import {Storage} from '@ionic/storage'
@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(@Inject('API_BASE_URL') private url, private http:HttpClient,private router :Router,private storage:Storage){}

    login(datosUser:object){
        this.http.post<any>(`${this.url}user/login`,{correo:datosUser['correo'],password:datosUser['password']},{withCredentials:true})
        .subscribe(async token=>{
           await this.storeToken(token['accesstoken']);
            this.router.navigate(['/']);
        })
    }

    finUserByCorreo(correo):Observable<Iuser>{
        return this.http.get<Iuser>(`${this.url}user/findUserByCorreo`,{params:{'correo':correo}})
    }

         getJwt(){
        return localStorage.getItem('a-token')
        // return await this.storage.get('a-token')
    }

    private async storeToken(token:string){
        // await this.storage.set('a-token',token)
        localStorage.setItem('a-token',token);
        // await this.storage.set('a-token',token)
    }  
    
    refreshToken(){
        return this.http.get<any>(`${this.url}user/refreshAccessToken`,{withCredentials:true})
        .pipe(tap((token:any)=>{this.storeToken(token['accesstoken'])}))
    }

     isLoggedIn(){
        return !! this.getJwt();
    }
}