import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Router } from '@angular/router';
import { HeaderColor } from '@ionic-native/header-color/ngx';
import { AuthService } from 'src/services/auth/auth.service';
import { NotificationsService } from '../services/notifications.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [NotificationsService]
})
export class AppComponent {

  showSplash = false;

  constructor(
    private platform: Platform,
    private network: Network,
    private router: Router,
    private toastController: ToastController,
    private headerColor: HeaderColor,
    private authService: AuthService,
    private oneSignal: OneSignal,
    private notificationsService: NotificationsService,
    // private screenOrientacion:ScreenOrientation
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    await this.authService.checkDarkTheme();
    this.headerColor.tint("#180B4F");
    if (this.platform.is('android')) {
      await this.stepPush()
    }
    // await this.notificationsService.getToken('')
    this.network.onDisconnect().subscribe(async () => {
      await this.toastPresent('Desconectado', 'toastClassOffline');
      this.router.navigate(['/network-state']);
    })
  }

  async stepPush() {
    try {
      this.oneSignal.startInit('646703c0-aef7-4377-933f-8dc5c367a412', '972225115593');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
      this.oneSignal.endInit()
    } catch (e) {
      this.toastPresent('Ocurrió un error al configurar las notificaciones.', 'toastClassOffline')
    }
  }
  async toastPresent(message: string, cssClass: string) {
    let toast = await this.toastController.create({
      duration: 3000,
      message: message,
      cssClass: cssClass
    });

    await toast.present();
  }

}
