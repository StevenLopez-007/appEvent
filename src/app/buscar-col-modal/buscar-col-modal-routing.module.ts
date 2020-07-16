import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarColModalPage } from './buscar-col-modal.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarColModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarColModalPageRoutingModule {}
