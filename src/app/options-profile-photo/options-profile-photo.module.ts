import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionsProfilePhotoPageRoutingModule } from './options-profile-photo-routing.module';

import { OptionsProfilePhotoPage } from './options-profile-photo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionsProfilePhotoPageRoutingModule
  ],
  declarations: [OptionsProfilePhotoPage]
})
export class OptionsProfilePhotoPageModule {}
