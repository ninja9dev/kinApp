import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberschedulePageRoutingModule } from './memberschedule-routing.module';

import { MemberschedulePage } from './memberschedule.page';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';
@NgModule({
  imports: [
    CommonModule,NgCalendarModule,
    FormsModule,
    IonicModule,
    MemberschedulePageRoutingModule
  ],
  declarations: [MemberschedulePage],
   entryComponents: [CalendarComponent, MonthViewComponent, WeekViewComponent, DayViewComponent]
})
export class MemberschedulePageModule {}
