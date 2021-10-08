import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { ReschedulePage } from '../reschedule/reschedule.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callwait',
  templateUrl: './callwait.page.html',
  styleUrls: ['./callwait.page.scss'],
})
export class CallwaitPage implements OnInit {
  personalProfile: any = JSON.parse(localStorage.getItem('profile'));
  callDetails:  any = JSON.parse(localStorage.getItem('call'));
  userId: any = localStorage.getItem('sin_auth_token');
  callData: any;
  username: any = localStorage.getItem('name');
  constructor(public modalCtrl: ModalController, public socket: Socket, public router: Router) {

    this.socket.fromEvent('message').subscribe((message: any) => {
      console.log(message);
      if(message.msg.event == 'close'){
        if(message.msg.data.contactUserId == this.userId){
          this.modalCtrl.dismiss({
            'dismissed': true
          });
        }else if(message.msg.data.userId == this.userId){
          this.modalCtrl.dismiss({
            'dismissed': true
          });
        }
      }else if(message.msg.event == 'reschedule'){
        if(message.msg.data.userId == this.userId){
          this.modalCtrl.dismiss({
            'dismissed': true
          });
        }
      }else if(message.msg.event == 'start-call'){
        if(message.msg.data.userId == this.userId){
          this.modalCtrl.dismiss({
            'dismissed': true
          });
          this.router.navigate(['/videocall']);
        }
      }
      this.callData = message.msg.data;
    });
  }

  ngOnInit() {
    this.socket.connect();
  }

  async reschedule()
  {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    this.socket.emit('send-message',{'data': this.callDetails, 'event': 'reschedule', 'user': this.username});
    const modal = await this.modalCtrl.create({
        component: ReschedulePage,
        cssClass: 'add-members'
      });

      return await modal.present();
  }
  dismiss() {
    this.socket.emit('send-message',{'data': this.callDetails, 'event': 'close', 'user': this.username});
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  };

  accept(){
    this.socket.emit('send-message',{'data': this.callDetails, 'event': 'start-call', 'user': this.username});

    this.modalCtrl.dismiss({
      'dismissed': true
    });
    this.router.navigate(['/videocall']);
  }
}
