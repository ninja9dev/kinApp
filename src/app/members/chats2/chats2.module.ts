import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Chats2PageRoutingModule } from './chats2-routing.module';

import { Chats2Page } from './chats2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Chats2PageRoutingModule
  ],
  declarations: [Chats2Page]
})
export class Chats2PageModule {}
