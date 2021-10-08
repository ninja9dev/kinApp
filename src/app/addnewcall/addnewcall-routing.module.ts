import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnewcallPage } from './addnewcall.page';

const routes: Routes = [
  {
    path: '',
    component: AddnewcallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddnewcallPageRoutingModule {}
