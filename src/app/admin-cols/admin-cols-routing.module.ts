import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminColsPage } from './admin-cols.page';

const routes: Routes = [
  {
    path: '',
    component: AdminColsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminColsPageRoutingModule {}
