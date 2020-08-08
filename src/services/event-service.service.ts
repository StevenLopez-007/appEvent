import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ievent } from '../model/ievent';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(@Inject('API_BASE_URL') private url:string,private http: HttpClient) { }

  public saveEvent(event:Object){
    return this.http.post<any>(`${this.url}event/create`,{event},{observe:'response'})
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
