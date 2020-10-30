import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-options-sale',
  templateUrl: './options-sale.page.html',
  styleUrls: ['./options-sale.page.scss'],
})
export class OptionsSalePage implements OnInit {
  @Input() op1:boolean;
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }
  async closePopover(option:number){
    await this.popoverController.dismiss({
      option:option
    })
  }
}
