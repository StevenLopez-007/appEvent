import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Iuser } from '../../model/iuser';
import { Observable,from } from 'rxjs';
import {Storage} from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn:'root'
})
export class AuthService{
    constructor(@Inject('API_BASE_URL') private url, private http:HttpClient,private router :Router,private storage:Storage,private loadingController: LoadingController){}

    login(datosUser:object){
        this.loadingLogin();
        this.http.post<any>(`${this.url}user/login`,{correo:datosUser['correo'],password:datosUser['password']})
        .pipe(finalize(async ()=>{
            await this.loadingController.dismiss();
        }))
        .subscribe(async token=>{
           await this.storeToken(token['accesstoken'],token['refreshToken']);
            this.router.navigate(['/']);
        })
    }

    finUserByCorreo(correo):Observable<Iuser>{
        return this.http.get<Iuser>(`${this.url}user/findUserByCorreo`,{params:{'correo':correo}})
    }

    getJwt(){
        return window.localStorage.getItem('a-token')
        // return await this.storage.get('a-token')
    }

    private async storeToken(aToken:string,rToken:string){
        // await this.storage.set('a-token',token)
        window.localStorage.setItem('a-token',aToken);
        if(rToken!=''){
            window.localStorage.setItem('r-token',rToken)
        }
        // await this.storage.set('a-token',token)
    }  
    
    refreshToken(){
        return this.http.get<any>(`${this.url}user/refreshAccessToken`,{headers:{'r-token':localStorage.getItem('r-token')}})
        .pipe(tap((token:any)=>{this.storeToken(token['accesstoken'],'')}))
    }

    async isLoggedIn(){
        // const token = await this.storage.get('a-token')
        // return token?true:false;
        return !! this.getJwt();
    }

    async loadingLogin(){
      const loading =  this.loadingController.create({
            cssClass: 'loadingClass',
            message: 'Cargando, espere...',
            spinner:'crescent',
            translucent: true
        });
        await (await loading).present();
    }
}