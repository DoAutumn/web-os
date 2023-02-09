import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockComponent } from './clock/clock.component';
import { CalendarComponent } from './calendar/calendar.component';



@NgModule({
  declarations: [
    ClockComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClockComponent,
    CalendarComponent
  ]
})
export class TimeModule { }
