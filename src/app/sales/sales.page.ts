import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, LoadingController, IonSelect, IonRefresher, PopoverController, ToastController, AlertController, Platform, IonContent } from '@ionic/angular';
import { EventService } from '../../services/event-service.service';
import { catchError, finalize } from 'rxjs/operators';
import { ISales } from '../../model/i-sales';
import { Observable } from 'rxjs';
import { OptionsSalePage } from '../options-sale/options-sale.page';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { HttpErrorResponse } from '@angular/common/http';
import { ScrollHideConfig } from '../directives/scrollHide.module';
import {CheckPermissions} from '../../services/checkPermissions'
@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
  providers:[CheckPermissions]
})
export class SalesPage implements OnInit {
  @Input() idEvent: string;
  @ViewChild('selectFilter') selectionFilter: IonSelect;
  @ViewChild('refreshSales') ionRefresher: IonRefresher;

  headerScrollConfig:ScrollHideConfig ={cssProperty:'margin-top',maxValue:44};

  sales: Observable<ISales[]>;
  optionsSelectPopover = {
    header: 'Buscar por...',
  }
  searchBy: string = 'nameClient';
  searchFilter: string;
  error: boolean = false;
  download: boolean = false;
  constructor(private modalController: ModalController,
    private eventService: EventService,
    private loadingController: LoadingController,
    private popoverController: PopoverController,
    private base64ToGallery: Base64ToGallery,
    private diagnostic: Diagnostic,
    private toastController: ToastController,
    private alertController: AlertController,
    private checkPermissions:CheckPermissions) { }

  async ngOnInit() {
    await this.getSales();
  }
  async closeModal() {
    await this.modalController.dismiss();
  }

  async getSales() {
    this.error = false;
    await this.presentLoading();
    this.eventService.sales(this.idEvent).pipe(finalize(async () => {
      await this.loadingController.dismiss();
      await this.ionRefresher.complete();
    }), catchError((e) => { this.error = true; return null })).subscribe((res) => {
      this.sales = res['sales'];
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      cssClass: 'loadingClass',
      translucent: true
    });
    await loading.present();
  }

  async openFilters() {
    await this.selectionFilter.open();
  }

  async popoverOptions(ev: any, email: string, idTaquilla: string, datosClient: object) {
    const popover = await this.popoverController.create({
      component: OptionsSalePage,
      event: ev,
      keyboardClose: true,
      translucent: true,
      componentProps: {
        op1: email == undefined || email == '' ? false : true,
      }
    });
    await popover.present();

    var { data } = await popover.onWillDismiss();
    data === undefined ? data = 0 : null;

    switch (data['option']) {
      case 1: {
        await this.reSendQREmail(idTaquilla)
        break;
      }
      case 2: {
        await this.getCodeQR(idTaquilla, datosClient);
        // this.getCodeQR(idTaquilla,datosClient)
        break;
      }
      default: {
        break;
      }

    }
  }
  async reSendQREmail(id: string) {
    await this.presentLoading();
    this.eventService.reSendQREmail(id).pipe(catchError(e => {
      if (e instanceof HttpErrorResponse && (e.status == 400 || e.status == 500)) {
        return this.Toast(e['error']['message'])
      } else {
        return this.Toast('Ocurrió un error.')
      }
    }), finalize(async () => {
      await this.loadingController.dismiss();
    })).subscribe(res => {
      this.Toast(res['message']);
    })
  }
  async getCodeQR(id: string, datosClient: object) {
    if (await this.checkPermissions.checkPermissions()) {
      await this.presentLoadingSaveImg();
      this.eventService.getNewCodeQr(id).pipe(catchError(async e => {
        if (e instanceof HttpErrorResponse && (e.status == 400 || e.status == 500)) {
          return await this.Toast(e['error']['message'])
        } else {
          return await this.Toast('Ocurrió un error.')
        }
      })).subscribe((res) => {
        this.saveImage(res['codeQr'], datosClient)
      })
    }
  }
  saveImage(url: string, datosImg: object) {
    this.base64ToGallery.base64ToGallery(url.replace(/^data:image\/(png|gif|jpeg);base64,/, ""), { prefix: `${datosImg['event']}_${datosImg['nameClient']}`, mediaScanner: true }).then(async res => {
      await this.loadingController.dismiss();
      setTimeout(async () => { await this.Toast('Codigo guardado en tu galeria'); }, 200)
    }, async err => {
      await this.loadingController.dismiss();
      await this.Toast('Ocurrió un error al guardar la imagen.');
    });
  }
  async Toast(message: string) {
    const toast = await this.toastController.create({
      cssClass: 'toastClass',
      message: message,
      duration: 3000,
      keyboardClose: true,

    })
   await toast.present();
  }
  async AlertOpenSettingStorage() {
    const alert = await this.alertController.create({
      header: 'Info.',
      message: 'Has denegado el permiso al almacenamiento, ¿Deseas abrir la configuración de la aplicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: async () => {
            await this.diagnostic.switchToSettings();
          }
        }
      ]
    });
    await alert.present();
  }
  async presentLoadingSaveImg() {
    const loading = await this.loadingController.create({
      duration: 3000,
      message: 'Guardando imagen...',
      cssClass: 'loadingClass',
      translucent: true
    });
    await loading.present();
  }
}
