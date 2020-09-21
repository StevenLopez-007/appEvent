import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ievent } from '../model/ievent';
import { Observable } from 'rxjs';
import { ISales } from '../model/i-sales';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(@Inject('API_BASE_URL') private url:string,private http: HttpClient) { }

  public saveEvent(event:Object){
    return this.http.post<any>(`${this.url}event/create`,{event},{observe:'response'})
  }

  public addEntradas(idEvent,numeroEntradas){
    return this.http.post<any>(`${this.url}event/addEntradas`,{numeroEntradas:numeroEntradas},{params:{'idEvent':idEvent},observe:'response'})
  }

  public validateEntry(entryToken:string){
    return this.http.get<any>(`${this.url}event/validateEntry`,{headers:{'e-token':entryToken}});
  }

  public saleTicket(idEvent:string,datosClient:Object){
    return this.http.post<any>(`${this.url}event/saleTicket/`,{nameClient:datosClient['name'],emailClient:datosClient['email']},
    {params:{'idEvent':idEvent},observe:'response'})
  }

  public sales(idEvent:string):Observable<ISales[]>{
    return this.http.get<ISales[]>(`${this.url}event/sales`,{params:{'idEvent':idEvent}})
  }

  public getEventPerUser():Observable<Ievent[]> {
      return this.http.get<Ievent[]>(`${this.url}event/getEventPerUser`)
  }

  public getCols(idEvent):Observable<any>{
    return this.http.get<any>(`${this.url}event/getCols`,{params:{'idEvent':idEvent}})
  }

  public deleteCol(correos:Array<any>,event:string):Observable<any>{
    return this.http.post<any>(`${this.url}event/deleteColaborador`,{'correos':correos},{params:{'event':event},observe:'response'});
  }

  public sendInvitation(correos:Array<any>,Event:Object):Observable<any>{
    return this.http.post<any>(`${this.url}event/sendInvitation/`,{'Event':Event,'correos':correos},{observe:'response'})  
  }
}
