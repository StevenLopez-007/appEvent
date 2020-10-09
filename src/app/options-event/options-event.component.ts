import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-options-event',
  templateUrl: './options-event.component.html',
  styleUrls: ['./options-event.component.scss'],
})
export class OptionsEventComponent implements OnInit {
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  closePopover(option:number){
    this.popoverController.dismiss({
      option:option
    })
  }

}
