import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event-service.service';
import { Ievent } from '../../model/ievent';
import { Observable } from 'rxjs';
import { PopoverController, ModalController } from '@ionic/angular';
// import { OptionsEventComponent } from '../options-event/options-event.component';
import { VerColaboradoresPage } from '../ver-colaboradores/ver-colaboradores.page';
import { Storage } from '@ionic/storage';

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
  constructor(private eventService:EventService,private modalController: ModalController,private storage:Storage) {}
  ngOnInit(){
   this.getEvents()
  }  
  doRefresh(event){
    this.getEvents();
    event.target.complete();
  }
  async getEvents(){
    this.eventService.getEventPerUser().subscribe(res=>{
      this.events=res['events']
    });
  }

  async verColaboradores(colaboradores:any,nameEvent:string,event:Object){
    const modal = await this.modalController.create({
      component:VerColaboradoresPage,
      componentProps:{
        'colaboradores':colaboradores,
        'nameEvent':nameEvent,
        'event':event
      }
    });
    return await modal.present();
  }
  // async optionsEvents(env:any){
  //   const popover = this.popoverCtrl.create({
  //     component:OptionsEventComponent,
  //     cssClass:'',
  //     event:env,
  //     translucent:true,
  //     keyboardClose:true
  //   });

  //   return (await popover).present();
  // }
}
