import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import {trigger,style,animate,transition} from '@angular/animations'

@Component({
  selector: 'app-options-event',
  templateUrl: './options-event.page.html',
  styleUrls: ['./options-event.page.scss'],
  animations: [
    trigger(
      'animationOptions2', 
      [
        transition(':enter', [style({opacity: 0 }),animate('0.12s ease-out', style({opacity: 1 }))]),
        transition(':leave', [style({opacity: 1 }),animate('0.12s ease-in', style({opacity: 0 }))])
      ]
    ),
    trigger(
      'animationOptions1', 
    [
      transition(':enter', [style({opacity: 0 }),animate('0.12s ease-out', style({opacity: 1 }))]),
      transition(':leave', [style({opacity: 1 }),animate('0.12s ease-in', style({opacity: 0 }))])
    ])
  ]
})
export class OptionsEventPage implements OnInit {
  showOptions1:boolean=true;
  showOptions2:boolean=false;
  constructor(private popoverController: PopoverController) { }

   ngOnInit() {}

  closePopover(option:number){
    this.popoverController.dismiss({
      option:option
    })
  }

  async showNotificationOptionsEnter(){
    this.showOptions1 = !this.showOptions1;
    setTimeout(()=>{this.showOptions2 = !this.showOptions2},120)
  }
  async showNotificationOptionsLeave(){
    this.showOptions2 = !this.showOptions2;
    setTimeout(()=>{this.showOptions1 = !this.showOptions1},120)
  }

}
