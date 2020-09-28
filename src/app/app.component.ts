import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
// import {fader} from './route-animations';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private screenOrientacion:ScreenOrientation
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      // await this.screenOrientacion.lock(this.screenOrientacion.ORIENTATIONS.LANDSCAPE)
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // prepareRoute(outlet:RouterOutlet){
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  // }
}
