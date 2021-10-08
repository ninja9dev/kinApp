import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddmembersPageRoutingModule } from './addmembers-routing.module';

import { AddmembersPage } from './addmembers.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule, ReactiveFormsModule,
    AddmembersPageRoutingModule
  ],
  declarations: [AddmembersPage]
})
export class AddmembersPageModule {}
