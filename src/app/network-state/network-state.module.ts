import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NetworkStatePageRoutingModule } from './network-state-routing.module';

import { NetworkStatePage } from './network-state.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NetworkStatePageRoutingModule
  ],
  declarations: [NetworkStatePage]
})
export class NetworkStatePageModule {}
