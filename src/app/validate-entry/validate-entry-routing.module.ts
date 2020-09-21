import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidateEntryPage } from './validate-entry.page';

const routes: Routes = [
  {
    path: '',
    component: ValidateEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidateEntryPageRoutingModule {}
