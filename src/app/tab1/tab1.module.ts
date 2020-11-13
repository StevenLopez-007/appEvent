import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ColorEventPipe } from '../pipes/color-event.pipe';
import { OrderEventsPerDatePipe } from '../pipes/order-events-per-date.pipe';
import {RefreshControl} from '../directives/refresherController'


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page,ColorEventPipe,OrderEventsPerDatePipe,RefreshControl]
})
export class Tab1PageModule {}
