import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ProfilesPageRoutingModule } from './profiles-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfilesPage } from './profiles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule, ReactiveFormsModule,
    ProfilesPageRoutingModule
  ],
  declarations: [ProfilesPage]
})
export class ProfilesPageModule {}
