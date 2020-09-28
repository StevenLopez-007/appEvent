import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  constructor(private router:Router,private statusBar:StatusBar) {}
  goTo(){
    this.router.navigate(['/validate-entry'])
  }
  ngOnInit(){
    this.statusBar.backgroundColorByHexString('#180B4F');
  }
}
