import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaleTicketPageRoutingModule } from './sale-ticket-routing.module';

import { SaleTicketPage } from './sale-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SaleTicketPageRoutingModule
  ],
  declarations: [SaleTicketPage]
})
export class SaleTicketPageModule {}
