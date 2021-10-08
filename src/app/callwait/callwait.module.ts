import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallwaitPageRoutingModule } from './callwait-routing.module';

import { CallwaitPage } from './callwait.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallwaitPageRoutingModule
  ],
  declarations: [CallwaitPage]
})
export class CallwaitPageModule {}
