import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { EventService } from '../../services/event-service.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-validate-entry',
  templateUrl: './validate-entry.page.html',
  styleUrls: ['./validate-entry.page.scss'],
})
export class ValidateEntryPage implements OnInit {
  scanSub:any;
  escaneando:boolean=false;
  constructor(private qrScanner: QRScanner,private alertController: AlertController,
    private eventService:EventService,
    private toastController: ToastController,
    private platform:Platform,
    private router:Router) { 

  }

  ngOnInit() {
    console.log("hola")
    this.scanQR()
    this.setBox();
  }

  scanQR(){
  // this.escaneando=true;
    this.qrScanner.prepare()
    .then((status:QRScannerStatus)=>{
      if(status.authorized){
        this.qrScanner.show();
        // document.getElementById('content').style.opacity="0";
         this.scanSub = this.qrScanner.scan().subscribe(async (tokenEntry:string)=>{
          // document.getElementById('content').style.opacity="1";
          // this.escaneando=false;
          this.scanSub.unsubscribe();
          this.validateEntry(tokenEntry)
          // await this.presentAlert(text);
        });
      }
      else if(status.denied){
        // this.escaneando=false;
        this.toast('Se necesita permiso a la camara.');
        this.qrScanner.openSettings();
        this.router.navigate(['/']);
      }
      else{
        // this.escaneando=false;
        this.toast('Se necesita permiso a la camara.');
        this.router.navigate(['/']);
      }
    }).catch((e:any)=>{
      // this.escaneando =false;
      console.log(e)
    })
  }

  stopScan(){
    document.getElementById('content').style.opacity="1";
    this.scanSub.unsubscribe();
    this.escaneando =false;
  }

  validateEntry(text){
    this.eventService.validateEntry(text).pipe(catchError(async err=>{return await this.toast(err['error']['message'])})).subscribe(async (res)=>{
      await this.toast(res['message']);
    })
  }

  async presentAlert(text:string){
    const alert = await this.alertController.create({
      header:text,
      buttons:[
        {
          text:'Cancelar',
          role:'cancel',
          handler:(blah)=>{

          }
        }
      ]
    })

    await alert.present();
  }

  async toast(message:string){
    const toast = await this.toastController.create({
      cssClass:'toastClass',
      duration:3000,
      message:message,
    })

    await toast.present();
  }

  setBox(){
    var width= ((this.platform.width()-250)/2);
    var height= ((this.platform.height()-307)/2);
    
    document.getElementById("divTop").style.height=`${height}px`;
    document.getElementById("divBottom").style.height=`${height}px`;

    document.getElementById("divRight").style.width=`${width}px`;
    document.getElementById("divLeft").style.width=`${width}px`;
  }

}
