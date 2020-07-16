import { Component } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BuscarColModalPage} from '../buscar-col-modal/buscar-col-modal.page'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  // customPickerOptions:any;
  nombre:String;
  descripcion:String;
  numeroEntradas:Number;
  precioEntradas:Number;
  Fecha:Date
  constructor(private modalCtrl:ModalController) { 
  }

  async presentModal(){
    const modal = await this.modalCtrl.create({
      component:BuscarColModalPage,
      cssClass:'',
    });
    return await modal.present();
  }

}
