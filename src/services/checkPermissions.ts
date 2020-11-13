import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { ToastController, AlertController } from '@ionic/angular';
import { AnimationAlert1 } from '../app/animations/alertAnimation1';
@Injectable()
export class CheckPermissions {
    constructor(private diagnostic: Diagnostic, private toastController: ToastController,
        private alertController: AlertController,private animationAlert1:AnimationAlert1) { }

    async checkPermissions() {
        try {
            const status = await this.diagnostic.requestRuntimePermission(this.diagnostic.permission.WRITE_EXTERNAL_STORAGE);
            switch (status) {
                case this.diagnostic.permissionStatus.GRANTED: {
                    return true;
                }
                case this.diagnostic.permissionStatus.DENIED_ALWAYS: {
                    await this.AlertOpenSettingStorage('Has denegado el permiso al almacenamiento, ¿Deseas abrir la configuración de la aplicación?');
                    return false;
                }
                default: {
                    await this.Toast('Se necesitan permiso para realizar esta función.');
                    return false;
                }
            }
        } catch (e) {
            await this.Toast('Ocurrió un error al solicitar permisos.');
            return false;
        }
    }

    async checkPermissionsCamera(){
        try {
            const status = await this.diagnostic.requestRuntimePermission(this.diagnostic.permission.CAMERA);
            switch (status) {
                case this.diagnostic.permissionStatus.GRANTED: {
                    return true;
                }
                case this.diagnostic.permissionStatus.DENIED_ALWAYS: {
                    await this.AlertOpenSettingStorage('Has denegado el permiso a la cámara, ¿Deseas abrir la configuración de la aplicación?');
                    return false;
                }
                default: {
                    await this.Toast('Se necesitan permisos para abrir la cámara.');
                    return false;
                }
            }
        } catch (e) {
            await this.Toast('Ocurrió un error al solicitar permisos.');
            return false;
        }
    }
    async AlertOpenSettingStorage(message:string) {
        const alert = await this.alertController.create({
            header: 'Info.',
            message: message,
            cssClass:'alertClass',
            leaveAnimation:this.animationAlert1.leaveAnimation,
            enterAnimation:this.animationAlert1.enterAnimation,
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
    async Toast(message: string) {
        const toast = await this.toastController.create({
            cssClass: 'toastClass',
            message: message,
            duration: 3000,
            keyboardClose: true,

        })
        await toast.present();
    }
}