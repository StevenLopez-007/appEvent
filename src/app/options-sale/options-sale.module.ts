import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionsSalePageRoutingModule } from './options-sale-routing.module';

import { OptionsSalePage } from './options-sale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionsSalePageRoutingModule
  ],
  declarations: [OptionsSalePage]
})
export class OptionsSalePageModule {}
