import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidateEntryPageRoutingModule } from './validate-entry-routing.module';

import { ValidateEntryPage } from './validate-entry.page';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidateEntryPageRoutingModule
  ],
  providers:[QRScanner],
  declarations: [ValidateEntryPage],
})
export class ValidateEntryPageModule {}
