import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorEmailsPage } from './error-emails.page';

const routes: Routes = [
  {
    path: '',
    component: ErrorEmailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorEmailsPageRoutingModule {}
