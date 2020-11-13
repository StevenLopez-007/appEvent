import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionsProfilePhotoPage } from './options-profile-photo.page';

const routes: Routes = [
  {
    path: '',
    component: OptionsProfilePhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsProfilePhotoPageRoutingModule {}
