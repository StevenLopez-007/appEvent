import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Router } from '@angular/router';
import { HeaderColor } from '@ionic-native/header-color/ngx';
import { AuthService } from 'src/services/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
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
    // private screenOrientacion:ScreenOrientation
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    await this.authService.checkDarkTheme();
    this.headerColor.tint("#180B4F");
    this.network.onDisconnect().subscribe(async () => {
      await this.toastPresent('Desconectado', 'toastClassOffline');
      this.router.navigate(['/network-state']);
    })
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
