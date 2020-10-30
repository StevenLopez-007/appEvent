import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event-service.service';
import { Ievent } from '../../model/ievent';
import { Observable } from 'rxjs';
import {ModalController, PopoverController,AnimationController } from '@ionic/angular';
import { OptionsEventComponent } from '../options-event/options-event.component';
import { VerColaboradoresPage } from '../ver-colaboradores/ver-colaboradores.page';
import { SaleTicketPage } from '../sale-ticket/sale-ticket.page';
import { SalesPage } from '../sales/sales.page';
import { AnimationModal1 } from '../animations/modalAnimation1';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers:[AnimationModal1]
})
export class Tab1Page implements OnInit{
  events:Observable<Ievent[]>;
  slideOptions={
    slidesPerView:1,
    initialSlide:0,
    spaceBetween:-85,
  };

  constructor(private eventService:EventService,private modalController: ModalController,private popoverController: PopoverController,
              private animationCrtl:AnimationController,private animationModal1:AnimationModal1) {}
  ngOnInit(){
   this.getEvents();
  } 
  doRefresh(event){
    this.getEvents();
    event.target.complete();
  }
  async getEvents(){
    this.eventService.getEventPerUser().subscribe(res=>{
      this.events=res['events'];
    });
  }
  async sales(idEvent){
    const modal = await this.modalController.create({
      component:SalesPage,
      componentProps:{
        'idEvent':idEvent
      }
    })

    await modal.present();
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
  async saleTicket(idEvent,nombre){
    const modal = await this.modalController.create({
      component:SaleTicketPage,
      cssClass:'modalSaleTicket',
      componentProps:{
        'idEvent':idEvent,
        'nameEvent':nombre,
      },
      mode:'md',
      backdropDismiss:false,
      enterAnimation:this.animationModal1.enterAnimation,
      leaveAnimation:this.animationModal1.leaveAnimation
    })
    await modal.present();
  }
  async optionsEvents(id:number,cols:Array<any>,nombre:string,event:Object,ev:any){ 
    const popover = await this.popoverController.create({
      component:OptionsEventComponent,
      cssClass:'',
      event:ev,
      translucent:true,
      keyboardClose:true
    });

     await popover.present();
     var {data} = await popover.onWillDismiss();
     data === undefined? data =0:null;
     switch(data['option']){
       case 1:{
          this.saleTicket(id,nombre);
         break;
        }
      case 2:{
        this.sales(id);
        break;
      }
      case 3:{
        this.verColaboradores(cols,nombre,event);
        break;
      }
        default:{
          
          
          break;
        }
     }
  }
  rotateCard(i:number){
    document.getElementById(`cardEvent${i}`).classList.toggle('rotateCard');
    setTimeout(()=>{
      document.getElementById(`titleCard1${i}`).classList.toggle('rotatedCard');
      document.getElementById(`SubtitleCard1${i}`).classList.toggle('rotatedCard')
      document.getElementById(`contentCard1${i}`).classList.toggle('rotatedCard')
    },70)
  }
}
