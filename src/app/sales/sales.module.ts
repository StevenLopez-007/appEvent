import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesPageRoutingModule } from './sales-routing.module';

import { SalesPage } from './sales.page';
import { FilterSalesPipe } from '../pipes/filter-sales.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesPageRoutingModule
  ],
  declarations: [SalesPage,FilterSalesPipe]
})
export class SalesPageModule {}
