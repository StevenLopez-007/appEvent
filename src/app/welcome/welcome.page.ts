import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSlides } from '@ionic/angular';
import { AnimationAlert1 } from '../animations/alertAnimation1';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  providers:[AnimationAlert1]
})
export class WelcomePage implements OnInit {
  @ViewChild('slides',{static:true}) slides:IonSlides 
  nameUser:string='';
  hide:boolean=false;
  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    // effect: slide,
    spaceBetween: 8,
    slidesPerView: 1,
    freeMode: true,
    loop: false
  };
  constructor(private statusBar:StatusBar,private router:Router,private alertController: AlertController,private animationAlert1:AnimationAlert1) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.nameUser = window.localStorage.getItem('nameUser');
    this.statusBar.styleLightContent();
    this.statusBar.backgroundColorByName('white');
    this.hideButtonExit()
  }

  exit(skip:boolean){
    if(skip){
      this.confirmation();
    }else{
      this.navigation()
    }
  }

  navigation(){
    this.router.navigate(['/'])
  }

  async hideButtonExit(){
    this.hide = await this.slides.isEnd();
  }
  async confirmation(){
    const altert = await this.alertController.create({
      header:'Info.',
      message:'¿Deseas omitir la bienvenida?',
      cssClass:'alertClass',
      enterAnimation:this.animationAlert1.enterAnimation,
      leaveAnimation:this.animationAlert1.leaveAnimation,
      buttons:[
        {
          text:'Cancelar',
          role:'cancel',
          cssClass:'buttonClassAlert'
        },
        {
          text:'Aceptar',
          cssClass:'buttonClassAlert',
          handler:()=>{
            this.navigation()
          }
        }
      ]
    });

    await altert.present();
  }
}
