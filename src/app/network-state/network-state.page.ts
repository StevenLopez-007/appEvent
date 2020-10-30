import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import {Location} from '@angular/common';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-network-state',
  templateUrl: './network-state.page.html',
  styleUrls: ['./network-state.page.scss'],
})
export class NetworkStatePage implements OnInit,OnDestroy {
  connection:Subscription;
  constructor(private router:Router,private network:Network,private location:Location,private toastController: ToastController,
              private statusBar:StatusBar) { }

  ngOnInit() {
    this.connection=this.network.onConnect().subscribe(async ()=>{
      await this.toastPresent('En linea','toastClassOnline');
      // if(this.router.url == '/network-state'){
      //  this.location.back();
      // }
      this.router.navigate(['/tabs/tab1'])
     });
  }

  ngOnDestroy(){
    this.connection.unsubscribe();
  }

  ionViewDidEnter(){
    this.statusBar.backgroundColorByHexString('#4D3BAC');
  }
  
  async toastPresent(message:string,cssClass:string){
    let toast = await this.toastController.create({
      duration:3000,
      message:message,
      cssClass:cssClass
    });

    await toast.present();
  }
  
}
