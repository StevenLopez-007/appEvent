import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../services/event-service.service';
import { Ievent } from '../../model/ievent';
import { Observable } from 'rxjs';
import { OptionsEventPage } from '../options-event/options-event.page'
import { VerColaboradoresPage } from '../ver-colaboradores/ver-colaboradores.page';
import { SaleTicketPage } from '../sale-ticket/sale-ticket.page';
import { SalesPage } from '../sales/sales.page';
import { AnimationModal1 } from '../animations/modalAnimation1';
import { finalize } from 'rxjs/operators';
import { OneSignalNotificationsService } from '../../services/one-signal-notifications.service';
import { AlertController, IonRefresher, ModalController, PopoverController, ToastController, IonSlides } from '@ionic/angular';
import { AnimationAlert1 } from '../animations/alertAnimation1';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [AnimationModal1, OneSignalNotificationsService, AnimationAlert1]
})
export class Tab1Page implements OnInit {
  events: Observable<Ievent[]>;
  eventsCol: Observable<Ievent[]>;
  empty: boolean = false;
  emptyCol: boolean = false;
  segment: number = 0;
  @ViewChild('refresher') ionRefresher: IonRefresher;
  @ViewChild('slides', { static: true }) ionSlides: IonSlides;
  // slideOptions = {
  //   slidesPerView: 1,
  //   initialSlide: 0,
  //   spaceBetween: -85,
  // };
  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 8,
    slidesPerView: 1,
    freeMode: false,
    loop: false
  };
  constructor(private eventService: EventService, private modalController: ModalController, private popoverController: PopoverController,
    private animationModal1: AnimationModal1, private animationAlert1: AnimationAlert1, private oneSignalNotificationsService: OneSignalNotificationsService, private alertController: AlertController,
    private toastController: ToastController) { }
  ngOnInit() {
    this.getEvents();
    this.getEventPerCol();
  }
  async getEvents() {
    this.eventService.getEventPerUser().pipe(finalize(async () => {
      await this.ionRefresher.complete()
    })).subscribe(res => {
      if (res['events'].length == 0) {
        this.events =res['events'];
        this.empty = true;
      } else {
        this.events = res['events'];
        this.empty = false;
      }
    },
      async error => {
        if (error instanceof HttpErrorResponse && (error.status == 400 || error.status == 500)) {
          await this.presentToast(error['error']['message']);
        } else {
          await this.presentToast('Ocurrió un error.');
        }
      });
  }
  async getEventPerCol() {
    this.eventService.getEventPerCol().pipe(finalize(async () => {
      await this.ionRefresher.complete()
    })).subscribe(res => {
      if (res['events'].length == 0) {
        this.eventsCol = res['events'];
        this.emptyCol = true;
      } else {
        this.eventsCol = res['events'];
        this.emptyCol = false;
      }
    },
      async error => {
        if (error instanceof HttpErrorResponse && (error.status == 400 || error.status == 500)) {
          await this.presentToast(error['error']['message']);
        } else {
          await this.presentToast('Ocurrió un error.');
        }
      });
  }
  async sales(idEvent) {
    const modal = await this.modalController.create({
      component: SalesPage,
      componentProps: {
        'idEvent': idEvent
      }
    })

    await modal.present();
  }
  async verColaboradores(colaboradores: any, nameEvent: string, event: Object) {
    const modal = await this.modalController.create({
      component: VerColaboradoresPage,
      componentProps: {
        'colaboradores': colaboradores,
        'nameEvent': nameEvent,
        'event': event
      }
    });
    return await modal.present();
  }
  async saleTicket(idEvent, nombre) {
    const modal = await this.modalController.create({
      component: SaleTicketPage,
      cssClass: 'modalSaleSwipe',
      componentProps: {
        'idEvent': idEvent,
        'nameEvent': nombre,
      },
      mode: 'md',
      backdropDismiss: false,
      enterAnimation: this.animationModal1.enterAnimation,
      leaveAnimation: this.animationModal1.leaveAnimation
    })
    await modal.present();
  }
  async optionsEvents(showCols:boolean,id: number, cols: Array<any>, nombre: string, event: Object, ev: any, fechaEvent: string) {
    const popover = await this.popoverController.create({
      component: OptionsEventPage,
      cssClass: 'popoverClass',
      event: ev,
      componentProps:{showCols:showCols},
      translucent: true,
      keyboardClose: true,
      mode: 'md'
    });

    await popover.present();
    var { data } = await popover.onWillDismiss();
    data === undefined ? data = 0 : null;
    switch (data['option']) {
      case 1: {
        this.saleTicket(id, nombre);
        break;
      }
      case 2: {
        this.sales(id);
        break;
      }
      case 3: {
        this.verColaboradores(cols, nombre, event);
        break;
      }
      case 4: {
        await this.oneSignalNotificationsService.showDatePicker(fechaEvent, { title: nombre });
        break;
      }
      case 5: {
        this.alertConfirmNotification(nombre, fechaEvent)
        break;
      }
      default: {
        break;
      }
    }
  }
  rotateCard(i: number) {
    document.getElementById(`cardEvent${i}`).classList.toggle('rotateCard');
    setTimeout(() => {
      document.getElementById(`titleCard1${i}`).classList.toggle('rotatedCard');
      document.getElementById(`SubtitleCard1${i}`).classList.toggle('rotatedCard')
      document.getElementById(`contentCard1${i}`).classList.toggle('rotatedCard')
    }, 70)
  }

  async checkRefresh() {
    if (this.segment == 0) {
      await this.getEvents();
    } else {
      await this.getEventPerCol();
    }
  }
  goToSlide(){
    this.ionSlides.slideTo(this.segment)
  }
  async slideChange(slides: IonSlides) {
    const index = await slides.getActiveIndex();
    this.segment = index;
  }
  async alertConfirmNotification(nombre: string, fechaEvent: string) {
    const alert = await this.alertController.create({
      enterAnimation: this.animationAlert1.enterAnimation,
      leaveAnimation: this.animationAlert1.leaveAnimation,
      header: 'Info.',
      message: '¿Deseas configurar la notificación?',
      cssClass: 'alertClass',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'buttonClassAlert'
        },
        {
          text: 'Aceptar',
          cssClass: 'buttonClassAlert',
          handler: async () => {
            await this.oneSignalNotificationsService.sendNotificationEvent({ title: nombre, content: '¡Ya es hora de dar inicio a este evento!' }, new Date(fechaEvent).toString())
          }
        },
      ]
    });

    await alert.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      cssClass: 'toastClassOffline',
      duration: 3000
    });
    await toast.present();
  }

  async slideStart(slides: IonSlides) {
   
      if (this.segment == 1) {
        this.segment = 0;
      } else {
        this.segment = 1;
      }
    
  }
  async slideEnd(slides: IonSlides) {
 
      if (this.segment == 0) {
        this.segment = 1;
      } else {
        this.segment = 0;
      }
    
  }
}
