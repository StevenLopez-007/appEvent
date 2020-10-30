import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionsSalePage } from './options-sale.page';

const routes: Routes = [
  {
    path: '',
    component: OptionsSalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsSalePageRoutingModule {}
