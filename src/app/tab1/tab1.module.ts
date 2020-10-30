import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ColorEventPipe } from '../pipes/color-event.pipe';
import { OrderEventsPerDatePipe } from '../pipes/order-events-per-date.pipe';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page,ColorEventPipe,OrderEventsPerDatePipe]
})
export class Tab1PageModule {}
