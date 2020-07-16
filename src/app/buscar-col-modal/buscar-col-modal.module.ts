import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarColModalPageRoutingModule } from './buscar-col-modal-routing.module';

import { BuscarColModalPage } from './buscar-col-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarColModalPageRoutingModule
  ],
  declarations: [BuscarColModalPage]
})
export class BuscarColModalPageModule {}
