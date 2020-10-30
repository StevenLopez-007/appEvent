import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesPageRoutingModule } from './sales-routing.module';

import { SalesPage } from './sales.page';
import { FilterSalesPipe } from '../pipes/filter-sales.pipe';
import {ScrollHideDirective} from '../../app/scrollHide.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesPageRoutingModule,
  ],
  declarations: [SalesPage,FilterSalesPipe,ScrollHideDirective],
})
export class SalesPageModule {}
