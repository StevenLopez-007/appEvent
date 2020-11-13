import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service'
import { UserSettingsPage } from '../user-settings/user-settings.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  dataUser: Object = {};
  darkMode: boolean = true;
  darkModeSystem: boolean;
  takeFroSystem: boolean;
  isAvailable:boolean;
  constructor(private authService: AuthService,private modalController: ModalController) {

    const darkMode = this.authService.getDarkMode();
    this.authService.availableDarkThemeSystem().then((res)=>{
      this.isAvailable=res;
    })
    if (darkMode == 'true') {
      this.darkMode = true;
    } else {
      this.darkMode = false;
    }
    const takeSystem = window.localStorage.getItem('takeFromSystem');
    if (takeSystem == 'true') {
      this.takeFroSystem = true;
    } else {
      this.takeFroSystem = false;
    }
    this.authService.darkModeSystem().then((res)=>{
      this.darkModeSystem=res;
    });
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.dataUser = {
      nameUser: window.localStorage.getItem('nameUser'),
      emailUser: window.localStorage.getItem('emailUser'),
      photo:window.localStorage.getItem('photo')
    }
  }
  async logOut() {
    await this.authService.logOut();
  }
  changeTheme() {
    this.darkMode = !this.darkMode;
    this.authService.darkMode(this.darkMode);
    document.body.classList.toggle('dark');
    this.authService.setStatusBarColor();
  }
  async changeThemefromSystem() {
    this.takeFroSystem = !this.takeFroSystem;
    this.authService.setDarkfromSystem(this.takeFroSystem)
    if (this.takeFroSystem) {
      if (this.darkModeSystem) {
        document.body.classList.add('dark')
      } else {
        document.body.classList.remove('dark')
      }
    } else {
      await this.authService.checkDarkTheme();
    }
    this.authService.setStatusBarColor();
  }

  async openConfiguration(){
    const modal = await this.modalController.create({
      component:UserSettingsPage,
      componentProps:{
        dataUser:this.dataUser
      },
    });

    await modal.present();
  }
}
