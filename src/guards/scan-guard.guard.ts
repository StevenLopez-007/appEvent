import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { ToastController, AlertController } from '@ionic/angular';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { AnimationAlert1 } from '../app/animations/alertAnimation1';

@Injectable({
  providedIn: 'root'
})
export class ScanGuardGuard implements CanActivate {
  constructor(private diagnostic: Diagnostic, private qrScaner: QRScanner,
    private toastController: ToastController,
    private alertController: AlertController,
    private animationAlert1:AnimationAlert1) { }
  async canActivate(): Promise<boolean> {
    try {
      const statusCamera = await this.diagnostic.requestRuntimePermission(this.diagnostic.permission.CAMERA);
      if ((this.diagnostic.permissionStatus.GRANTED || this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE) == statusCamera) {
        if (document.getElementById("contentScan") != null) {
          document.getElementById("contentScan").style.backgroundColor = "transparent"
          document.getElementById("contentScan").style.opacity = "1";
        }
        return true;
      }
      else if (this.diagnostic.permissionStatus.DENIED_ONCE == statusCamera) {
        await this.toast('Se necesita permiso a la camara para escanear.');
        return false;
      } else if (this.diagnostic.permissionStatus.DENIED_ALWAYS == statusCamera) {
        await this.alertConfig()
        return false;
      }
      else{
        await this.toast('Se necesita permiso a la camara para escanear.');
        return false;
      }
    } catch (e) {
      await this.alertConfig()
      // await this.toast('Ocurrió un error al solicitar los permisos.')
      return false
    }

  }

  async toast(message: string) {
    const toast = await this.toastController.create({
      duration: 3000,
      message: message,
      cssClass: 'toastClass'
    });
    await toast.present();
  }

  async alertConfig() {
    const alert = await this.alertController.create({
      header: 'Info.',
      message: 'Permisos a la camara denegados por siempre.¿Acceder a la configuración?.',
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
            await this.diagnostic.switchToSettings()
          }
        }
      ]
    });
    await alert.present();
  }
}
