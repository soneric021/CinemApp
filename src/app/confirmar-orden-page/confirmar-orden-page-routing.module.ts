import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarOrdenPagePage } from './confirmar-orden-page.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarOrdenPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarOrdenPagePageRoutingModule {}
