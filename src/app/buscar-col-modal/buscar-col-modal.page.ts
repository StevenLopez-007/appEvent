import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-buscar-col-modal',
  templateUrl: './buscar-col-modal.page.html',
  styleUrls: ['./buscar-col-modal.page.scss'],
})
export class BuscarColModalPage implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss({ 
      'dismissed':true
    });
  }

  

}
