import { Component, OnInit , ViewChild} from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
@Component({
  selector: 'app-memberschedule',
  templateUrl: './memberschedule.page.html',
  styleUrls: ['./memberschedule.page.scss'],
})
export class MemberschedulePage implements OnInit {
		@ViewChild(CalendarComponent) myCalendar:CalendarComponent;
eventSource;
viewTitle;
isToday: boolean;
onViewTitleChanged = (title: string) => {
       this.viewTitle = title;
   };

calendar = {
mode: 'month',
currentDate: new Date()

};

slideNext() {
        this.myCalendar.slideNext();
    }
	slidePrev(){
        this.myCalendar.slidePrev();
    }
  constructor() { }

  ngOnInit() {
  }

}
