import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrorEmailsPageRoutingModule } from './error-emails-routing.module';

import { ErrorEmailsPage } from './error-emails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErrorEmailsPageRoutingModule
  ],
  declarations: [ErrorEmailsPage]
})
export class ErrorEmailsPageModule {}
