import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcallPageRoutingModule } from './addcall-routing.module';

import { AddcallPage } from './addcall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcallPageRoutingModule
  ],
  declarations: [AddcallPage]
})
export class AddcallPageModule {}
