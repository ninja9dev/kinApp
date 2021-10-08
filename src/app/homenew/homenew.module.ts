import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomenewPageRoutingModule } from './homenew-routing.module';

import { HomenewPage } from './homenew.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    HomenewPageRoutingModule
  ],
  declarations: [HomenewPage]
})
export class HomenewPageModule {}
