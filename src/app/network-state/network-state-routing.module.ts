import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NetworkStatePage } from './network-state.page';

const routes: Routes = [
  {
    path: '',
    component: NetworkStatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworkStatePageRoutingModule {}
