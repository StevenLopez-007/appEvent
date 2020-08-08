import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerColaboradoresPageRoutingModule } from './ver-colaboradores-routing.module';

import { VerColaboradoresPage } from './ver-colaboradores.page';
import { FindColbyMailPipe } from '../pipes/find-colby-mail.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerColaboradoresPageRoutingModule
  ],
  declarations: [VerColaboradoresPage,FindColbyMailPipe]
})
export class VerColaboradoresPageModule {}
