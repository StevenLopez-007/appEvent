import { Component, OnInit, OnDestroy } from '@angular/core';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { ToastController, Platform } from '@ionic/angular';
import { EventService } from '../../services/event-service.service';
import { catchError, finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-validate-entry',
  templateUrl: './validate-entry.page.html',
  styleUrls: ['./validate-entry.page.scss'],
})
export class ValidateEntryPage implements OnInit, OnDestroy {
  scanSub: Subscription;
  light: boolean = false;
  camera:number=0;
  constructor(private qrScanner: QRScanner,
    private eventService: EventService,
    private toastController: ToastController,
    private platform: Platform,
    private activatedRoute:ActivatedRoute) {
  }
  async ngOnInit() {
    this.activatedRoute.data.subscribe(data=>{
      this.camera=data['camera'];
      this.light=data['light'];
    })
    this.setBox();
    await this.scanQR()
  }

  ngOnDestroy() {
    this.scanSub.unsubscribe();
  }

  async scanQR() {
    await this.qrScanner.show();

    this.scanSub = this.qrScanner.scan().subscribe(async (tokenEntry: string) => {
      this.validateEntry(tokenEntry);
      this.scanSub.unsubscribe();
    });

  }
  validateEntry(text) {
    this.eventService.validateEntry(text).pipe(catchError(async err => { return await this.toast(err['error']['message']) }), finalize(() => {
      this.scanQR();
    })).subscribe(async (res) => {
      await this.toast(res['message']);
    })
  }

  async toast(message: string) {
    const toast = await this.toastController.create({
      cssClass: 'toastClass',
      duration: 3000,
      message: message,
    })

    await toast.present();
  }

  setBox() {
    document.getElementById("contentScan").style.backgroundColor = "transparent"
    var width = ((this.platform.width() - 250) / 2);
    var height = ((this.platform.height() - 307) / 2);

    document.getElementById("divTop").style.height = `${height}px`;
    document.getElementById("divBottom").style.height = `${height}px`;

    document.getElementById("divRight").style.width = `${width}px`;
    document.getElementById("divLeft").style.width = `${width}px`;

    //lineScanPosition
    document.getElementById("lineScan").animate([
      {transform:`translateY(${height}px)`},
      {transform:`translateY(${height+250}px)`},
      {transform:`translateY(${height}px)`},
    ],{
      duration:5000,
      iterations:Infinity
    });
  }

  async lightControl() {
    try {
      if (this.light) {
        await this.qrScanner.disableLight();
        this.light = false;
      }
      else {
        await this.qrScanner.enableLight();
        this.light = true;
      }
    } catch (e) {
      await this.toast('Ocurrió un error al encender el flash.')
    }
  }

  async cameraControl(){
    try{
      if(this.camera){
        this.camera=0;
      }else{
        this.light=false;
        this.camera=1;
      }
    await this.qrScanner.useCamera(this.camera);
    }catch(e){
      this.toast('Ocurrio un error al cambiar de cámara.');
      this.camera?this.camera=0:this.camera=1;
    }
  }
}
