import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Chats2Page } from './chats2.page';

const routes: Routes = [
  {
    path: '',
    component: Chats2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Chats2PageRoutingModule {}
