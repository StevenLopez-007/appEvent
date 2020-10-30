import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { LoadingController, ToastController, AlertController, IonCheckbox } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event-service.service';
import { finalize, catchError } from 'rxjs/operators';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { HttpErrorResponse } from '@angular/common/http';
import {SwipeCloseModal} from '../animations/modalSwipeAnimation';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import { AnimationAlert1 } from '../animations/alertAnimation1';
@Component({
  selector: 'app-sale-ticket',
  templateUrl: './sale-ticket.page.html',
  styleUrls: ['./sale-ticket.page.scss'],
  providers:[SwipeCloseModal,Keyboard,AnimationAlert1]
})
export class SaleTicketPage implements OnInit {
  @Input() idEvent: string;
  @Input() nameEvent: string;
  @ViewChild('checkbox') checkbox: IonCheckbox;
  @ViewChild('headerSale', { read: ElementRef }) header: ElementRef;
  enviado = false;
  taquillaForm: FormGroup;
  downloadQR: boolean = false;
  closeSwipeModal:any = (ev)=>{
    if(ev.target.localName=='ion-backdrop'){
      if(this.keyboard.isVisible){
        this.keyboard.hide()
      }else{
        this.swipeCloseModal.closeModalSwipe(0)
      }
    }
  }
  constructor(private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private toastController: ToastController,
    private alertController: AlertController,
    private base64ToGallery: Base64ToGallery,
    private diagnostic: Diagnostic,
    private swipeCloseModal:SwipeCloseModal,
    private keyboard:Keyboard,
    private animationAlert1:AnimationAlert1) {
     }

  ngOnInit() {
    this.taquillaForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      email: ['', [Validators.pattern('^([a-zA-Z0-9_\.\-])+\@([a-z-0-9\-]+\.)+([a-zA-Z0-9]{2,4})+$')]],
    })
  }
  
  ionViewDidEnter() {
    document.body.addEventListener('click',this.closeSwipeModal,true)
    this.swipeCloseModal.swipeAnimation(this.header);
  }
  ionViewWillLeave(){
    document.body.removeEventListener('click',this.closeSwipeModal,true)
  }
  get errrosForm() {
    return this.taquillaForm.controls;
  }

  saleTicket(datos: Object) {
    if (this.downloadQR || datos['email'].length > 0) {
      this.loading();
      this.eventService.saleTicket(this.idEvent, datos, this.downloadQR).pipe(finalize(async () => {
        await this.loadingController.dismiss();
      }), catchError((e) => {
        if (e instanceof HttpErrorResponse && (e.status == 400 || e.status == 500)) {
          return this.Toast(e['error']['message'])
        } else {
          return this.Toast('Ocurrió un error.')
        }
      })).subscribe(async (res) => {

        await this.Toast(res['body']['message']);
        if (this.downloadQR) {
          console.log("entro")
          const url = res['body']['codeQr'];
          this.saveImage(url, this.taquillaForm.value);
        }
        this.taquillaForm.reset();
        this.enviado = false;
      })
    } else {
      this.Toast('Ingrese un correo, descarge el codigo QR ó realice ambas acciones.')
    }
  }

  async sale() {
    this.enviado = true;
    if (this.taquillaForm.valid) {
      this.saleTicket(this.taquillaForm.value);
    }
    else {
      this.Toast('Rellene los campos.');
    }
  }

  saveImage(url: string, datosClient: object) {
    this.base64ToGallery.base64ToGallery(url.replace(/^data:image\/(png|gif|jpeg);base64,/, ""), { prefix: `${this.nameEvent}_${datosClient['name']}`, mediaScanner: true }).then(res => {
      setTimeout(async () => {
        await this.Toast('Codigo guardado en tu galeria');
      }, 3200)
    }, async err => {
      this.downloadQR = false;
      await this.presentAlertError();
    });
  }

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Procesando...',
      cssClass: 'loadingClass',
      translucent: true
    })
    await loading.present();
  }

  async Toast(message: string) {
    const toast = await this.toastController.create({
      cssClass: 'toastClass',
      message: message,
      duration: 3000,
      keyboardClose: true,

    })
    toast.present();
  }

  dialog(event: any) {
    if (event['detail']['checked']) {
      this.diagnostic.requestRuntimePermission(this.diagnostic.permission.WRITE_EXTERNAL_STORAGE).then(async (status) => {
        if (this.diagnostic.permissionStatus.GRANTED == status) {
          // await this.presentAlert();
        }
        else if (this.diagnostic.permissionStatus.DENIED_ALWAYS == status) {
          this.downloadQR = false;
          this.checkbox.checked = false;
          await this.AlertOpenSettingStorage();
        }
        else {
          this.downloadQR = false;
          await this.Toast('Se necesitan permisos para usar esta función.')
        }
      }).catch((e) => {
        this.downloadQR = false;
        this.checkbox.checked = false;
        this.Toast('Ocurrió un error al activar esta función');
      })

    }
  }

  async presentAlertError() {
    const alert = await this.alertController.create({
      header: 'Info.',
      cssClass:'alertClass',
      enterAnimation:this.animationAlert1.enterAnimation,
      leaveAnimation:this.animationAlert1.leaveAnimation,
      message: 'Ocurrió un error al guardar la imagen. Revisa los permisos de almacenamiento de la aplicación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass:'buttonClassAlert'
        },
        { text: 'Aceptar',cssClass:'buttonClassAlert' },
      ]
    });
    await alert.present();
  }

  async AlertOpenSettingStorage() {
    const alert = await this.alertController.create({
      header: 'Info.',
      message: 'Has denegado el permiso al almacenamiento, ¿Deseas abrir la configuración de la aplicación?',
      cssClass:'alertClass',
      enterAnimation:this.animationAlert1.enterAnimation,
      leaveAnimation:this.animationAlert1.leaveAnimation,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass:'buttonClassAlert'
        },
        {
          text: 'Aceptar',
          cssClass:'buttonClassAlert',
          handler: async () => {
            await this.diagnostic.switchToSettings();
          }
        }
      ]
    });
    await alert.present();
  }
  
  // @HostListener('document:click', ['$event','$event.target'])
  // handleKeyDown(event: MouseEvent, targetElement: HTMLElement) {
  //   console.log(event != null)
  //   console.log(targetElement)
  // }
}
