import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  constructor(private router:Router,private splashScreen:SplashScreen,private authService:AuthService) {}
  goTo(){
    this.router.navigate(['/validate-entry'])
  }
  ngOnInit(){
    
  }
  ionViewWillEnter(){
    if(document.body.classList.contains('dark')){
      document.getElementsByTagName("body")[0].style.backgroundColor="#180B4F";
    }
    else{
      document.getElementsByTagName("body")[0].style.backgroundColor="#F8F9F9";
    }
    this.authService.setStatusBarColor();
  }
  ionViewDidEnter(){
    this.splashScreen.hide();
    // this.statusBar.backgroundColorByHexString('#180B4F');
  }
}
