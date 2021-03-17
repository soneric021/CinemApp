import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelarOrdenPageRoutingModule } from './cancelar-orden-routing.module';

import { CancelarOrdenPage } from './cancelar-orden.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelarOrdenPageRoutingModule
  ],
  declarations: [CancelarOrdenPage]
})
export class CancelarOrdenPageModule {}
