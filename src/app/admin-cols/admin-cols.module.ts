import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminColsPageRoutingModule } from './admin-cols-routing.module';

import { AdminColsPage } from './admin-cols.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminColsPageRoutingModule
  ],
  declarations: [AdminColsPage]
})
export class AdminColsPageModule {}
