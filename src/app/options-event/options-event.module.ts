import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionsEvent1PageRoutingModule } from './options-event-routing.module';

import { OptionsEventPage } from './options-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionsEvent1PageRoutingModule
  ],
  declarations: [OptionsEventPage]
})
export class OptionsEvent1PageModule {}
