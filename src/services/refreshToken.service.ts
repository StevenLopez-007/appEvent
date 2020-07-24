import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class refreshToken {
    constructor(@Inject('API_BASE_URL') private url:string, private http:HttpClient){}

    public async refresh(){
        const token = await this.http.get(`${this.url}user/refreshAccessToken`,{
            headers:{'a-token':localStorage.getItem('a-token')},
            withCredentials:true
        }).toPromise();
        console.log(token)
    }

    public log(){
        console.log("HOlaaaaaaaaaaaa")
    }
}