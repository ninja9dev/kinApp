import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcallPage } from './addcall.page';

const routes: Routes = [
  {
    path: '',
    component: AddcallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcallPageRoutingModule {}
