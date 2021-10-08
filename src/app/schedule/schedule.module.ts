import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulePageRoutingModule } from './schedule-routing.module';

import { SchedulePage } from './schedule.page';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';

@NgModule({
  imports: [
    CommonModule,NgCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SchedulePageRoutingModule
  ],
  declarations: [SchedulePage],
    entryComponents: [CalendarComponent, MonthViewComponent, WeekViewComponent, DayViewComponent]
})
export class SchedulePageModule {}
