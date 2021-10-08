import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddContact2Page } from './add-contact2.page';

const routes: Routes = [
  {
    path: '',
    component: AddContact2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddContact2PageRoutingModule {}
