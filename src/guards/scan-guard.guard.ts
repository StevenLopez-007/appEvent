import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ScanGuardGuard implements CanActivate {
  constructor(private qrScaner:QRScanner,private toastController: ToastController){}
  async canActivate():Promise<boolean>{
      // this.qrScaner.prepare()
      // .then((qrStatus:QRScannerStatus)=>{
      //   if(qrStatus.authorized){
      //     return true;
      //   }
      // })

    try{
      const qrStatus = await this.qrScaner.prepare();
      if(qrStatus.authorized){
        if(document.getElementById("contentScan") != null){
           document.getElementById("contentScan").style.backgroundColor="transparent"
           document.getElementById("contentScan").style.opacity="1";
        }
        return true;
      }
      else if(qrStatus.denied){
        await this.toast('Se necesita permiso a la camara para escanear.');
        this.qrScaner.openSettings();
        return false;
      }
      else{
        await this.toast('Se necesita permiso a la camara para escanear.');
        return false;
      }
      // if(document.getElementById("contentScan") != null){
      //        document.getElementById("contentScan").style.backgroundColor="transparent"
      //        document.getElementById("contentScan").style.opacity="1";
      //     }
      //   return true;
      
    }catch(e){
     console.log(e)
      return false
    }
  
  }

  async toast(message:string){
    const toast = await this.toastController.create({
      duration:3000,
      message:message,
      cssClass:'toastClass'
    });
    await toast.present();
  }
}
