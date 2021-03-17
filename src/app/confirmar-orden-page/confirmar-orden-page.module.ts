import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarOrdenPagePageRoutingModule } from './confirmar-orden-page-routing.module';

import { ConfirmarOrdenPagePage } from './confirmar-orden-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarOrdenPagePageRoutingModule
  ],
  declarations: [ConfirmarOrdenPagePage]
})
export class ConfirmarOrdenPagePageModule {}
