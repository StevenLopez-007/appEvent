import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleTicketPage } from './sale-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: SaleTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleTicketPageRoutingModule {}
