import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event-service.service';
import { Ievent } from '../../model/ievent';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  events:Observable<Ievent[]>;
  slideOptions={
    slidesPerView:1,
    initialSlide:1,
    spaceBetween:-85,
    // width:350
  };
  constructor(private eventService:EventService) {}
  ngOnInit(){
    this.eventService.getEventPerUser().subscribe(res=>{
      this.events=res['events']
    });
  }  

}
