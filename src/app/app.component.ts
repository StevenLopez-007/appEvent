import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import {timer} from 'rxjs';
// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
// import {fader} from './route-animations';
// import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  showSplash=false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private network:Network,
    private router:Router,
    private location:Location,
    private toastController: ToastController,
    // private screenOrientacion:ScreenOrientation
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.statusBar.backgroundColorByName('white');
      await this.platform.ready();
      // this.statusBar.backgroundColorByHexString('#3C297E');
      // await this.screenOrientacion.lock(this.screenOrientacion.ORIENTATIONS.LANDSCAPE)
      // this.splashScreen.hide();
      // timer(3000).subscribe(()=>{
      //   this.showSplash=false;
      // })

      this.network.onDisconnect().subscribe(async ()=>{
        await this.toastPresent('Desconectado','toastClassOffline');
        this.router.navigate(['/network-state'])
      })  
      
      this.network.onChange().subscribe(()=>{
        this.network.onConnect().subscribe(async ()=>{
          await this.toastPresent('En linea','toastClassOnline');
          if(this.router.url == '/network-state'){
           this.location.back();
          }
         })
      })
    
  }

  async toastPresent(message:string,cssClass:string){
    let toast = await this.toastController.create({
      duration:3000,
      message:message,
      cssClass:cssClass
    });

    await toast.present();
  }

  // prepareRoute(outlet:RouterOutlet){
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  // }
}
