import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddContact2PageRoutingModule } from './add-contact2-routing.module';

import { AddContact2Page } from './add-contact2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddContact2PageRoutingModule
  ],
  declarations: [AddContact2Page]
})
export class AddContact2PageModule {}
