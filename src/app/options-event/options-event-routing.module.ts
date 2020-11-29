import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionsEventPage } from './options-event.page';

const routes: Routes = [
  {
    path: '',
    component: OptionsEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsEvent1PageRoutingModule {}
