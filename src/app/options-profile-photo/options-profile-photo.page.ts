import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-options-profile-photo',
  templateUrl: './options-profile-photo.page.html',
  styleUrls: ['./options-profile-photo.page.scss'],
})
export class OptionsProfilePhotoPage implements OnInit {
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async closeModal(option:number){
    await this.modalController.dismiss({
      option:option
    })
  }
}
