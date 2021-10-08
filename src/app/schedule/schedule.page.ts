import { Component, OnInit, ElementRef, ChangeDetectorRef} from '@angular/core';
import { ModalController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddnewcallPage } from '../addnewcall/addnewcall.page';
import { WebrtcService } from '../providers/webrtc.service';
import { Socket } from 'ngx-socket-io';
import { CallwaitPage } from '../callwait/callwait.page';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  eventSource;
  viewTitle;
  isToday: boolean;
  listing: any = [];
  calls:any;
  loading:any;
  startVideo: any;
  partnerId: any = localStorage.getItem('chatWithUser');
  myEl: HTMLMediaElement; 
  partnerEl: HTMLMediaElement;
  user: any = localStorage.getItem('user');
  userId: any;
  topVideoFrame: any;
  otherUser: any;
  profile: any = JSON.parse(localStorage.getItem('profile'));
  onViewTitleChanged = (title: string) => {
    this.viewTitle = title;
  };

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  getData()
  {
    this.listing = [];
    let dict = {
      'userId': localStorage.getItem('sin_auth_token')
    };
    this.userService.postData(dict,'getCalls').subscribe((result) => {
      if(result.status == 1)
      {
        console.log(result);
        this.calls = result.data;
        for(var i=0; i< this.calls.length; i++)
        {
          let firstDate   = this.formatDate(this.calls[i].callDate);
          let secondDate  = this.formatDate(new Date());
          // alert(firstDate + secondDate);
          if(firstDate == secondDate)
          {
            this.listing.push(this.calls[i]);
          }

        }

        this.cd.detectChanges();
      }
      else{
        this.presentToast('No any call found','danger');
      }
    },
    err => {
      this.stopLoading();
        this.presentToast('Technical error,Please try after some time.','danger');
    });
  }

  deleteCall(callID)
  {
    let dict = {
      '_id': callID
    };
    this.userService.postData(dict,'deleteCall').subscribe((result) => {
      if(result.status == 1)
      {
        this.presentToast('Scheduled call deleted successfully','success');
      }
      else
      {
        this.presentToast('No any call found','danger');
      }
    },
    err => {
      this.stopLoading();
        this.presentToast('Technical error,Please try after some time.','danger');
    });
  }
  
  abc() {
    this.calendar.mode='month';
  };
  abc1() {
    this.calendar.mode='day';
  };
  abc2(ev) {
    this.calendar.mode='week';
  };

  onTimeSelected(ev) 
  {
    this.listing = [];

    let dict = {
      'userId': localStorage.getItem('sin_auth_token')
    };
    this.userService.postData(dict,'getCalls').subscribe((result) => {
      if(result.status == 1)
      {
        console.log(result);
        this.calls = result.data;
        for(var i=0; i< this.calls.length; i++)
        {
          let firstDate   = this.formatDate(this.calls[i].callDate);
          let secondDate  = this.formatDate(ev.selectedTime);
          // alert(firstDate + secondDate);
          if(firstDate == secondDate)
          {
            this.listing.push(this.calls[i]);
          }
        }
      }
      else{
        this.presentToast('No any call found','danger');
      }
    },
    err => {
      this.stopLoading();
        this.presentToast('Technical error,Please try after some time.','danger');
    });
    //this.calendar.mode='week';
  };

  formatDate(dates)
  {
    var date_to_parse = new Date(dates);
    var year  = date_to_parse.getFullYear().toString();
    var month = (date_to_parse.getMonth() + 1).toString();
    var day   = date_to_parse.getDate().toString();

    return day+':'+month+':'+year; 
  }

  constructor(private cd: ChangeDetectorRef, public webRTC: WebrtcService, public elRef: ElementRef, public modalController: ModalController, public toastController: ToastController, public userService: UserService, public loadingController: LoadingController, public router: Router, private platform: Platform, public fb: FormBuilder, public socket: Socket) { }
    

  async addCall(){
    const modal = await this.modalController.create({
        component: AddnewcallPage,
        cssClass: 'add-members'
      });

      /*modal.onDidDismiss(data => {
        console.log(data);
      });*/

      return await modal.present();
  }

  ngOnInit()
  {
    this.listing = [];
    this.getData();
    this.socket.connect();
  }   

  countdown(date)
  {
    // return;
    // console.log(date);
    // console.log('here')
    let countDownDate = new Date(date).getTime();
    let x = setInterval(function () 
    {
      // Get todays date and time
      let now = new Date().getTime();
      // Find the distance between now and the count down date
      let distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      let days   = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours  = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // console.log(now, "now", "countDownDate", countDownDate, "distance", distance, "days", days);

      // Output the result in an element with id="demo"
      return (days + "d " + hours + "h "
              + minutes + "m " + seconds + "s ");

      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "<b style='color:red;'>EXPIRED</b>";
      }
    }, 1000);
  }

  // VIDEO STYFF BELOW ----------------------------------------

    call(item)
    {
      // this.startVideo = true;
      // let self = this;
      // this.socket.emit('send-message', {'user': this.otherUser, 'receiver': self.partnerId, 'event': 'start'});
      // setTimeout(function(){
      //   self.myEl = self.elRef.nativeElement.querySelector('#my-video');
      //   self.partnerEl = self.elRef.nativeElement.querySelector('#partner-video');
      //   self.webRTC.init(self.userId, self.myEl, self.partnerEl);
      //   self.webRTC.call(self.partnerId);
      //   self.swapVideo('my-video');
      // }, 1000);

      localStorage.setItem('calling', 'true');
      localStorage.setItem('chatWithUser', '5f439a1e5e6b6b7c06d3c77b');
      localStorage.setItem('user', item.contactName);
      localStorage.setItem('start', 'true');
      this.router.navigate(['/messages']);
    }


    async calling(item){
      if(item.isAppUser){
        let name = this.profile.firstname + ' ' + this.profile.lastname;
        this.socket.emit('send-message',{'data': item, 'event': 'open', 'user': name});
        localStorage.setItem('call', JSON.stringify(item));
        const modal = await this.modalController.create({
          component: CallwaitPage,
          cssClass: 'add-members'
        });

          /*modal.onDidDismiss(data => {
            console.log(data);
          });*/

        return await modal.present();
      }else{
        this.presentToast('User still not app user.','warning');
      }
      
    }
   

    // disconnect(){
   //   this.router.navigate(['/tabs/chats']);
   //  }

   

  selectedDate(date){
    console.log(date)
  }

  async presentToast(message,color) {
      const toast = await this.toastController.create({
        message: message,
        duration: 3000,
        position: 'bottom',
        color: color,
        // showCloseButton: true
      });
      toast.present();
    }

    async presentLoading() {
      this.loading = await this.loadingController.create();
      await this.loading.present();
    }

    async stopLoading() {
      if(this.loading != undefined){
        await this.loading.dismiss();
      }
      else{
        var self = this;
        setTimeout(function(){
          self.stopLoading();
        },1000);
      }
    };

  getTimeRemaining(endtime){
    // const total = Date.parse(endtime) - Date.parse(new Date());
    // const seconds = Math.floor( (total/1000) % 60 );
    // const minutes = Math.floor( (total/1000/60) % 60 );
    // const hours = Math.floor( (total/(1000*60*60)) % 24 );
    // const days = Math.floor( total/(1000*60*60*24) );

    // console.log(total);
    // return 
    // return {
    //   total,
    //   days,
    //   hours,
    //   minutes,
    //   seconds
    // };
  };
}
