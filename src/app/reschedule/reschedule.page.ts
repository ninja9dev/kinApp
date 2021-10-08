import { Component, OnInit, ElementRef, ChangeDetectorRef} from '@angular/core';

import { ModalController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalFooService } from '../services/user/globalFooService.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.page.html',
  styleUrls: ['./reschedule.page.scss'],
})
export class ReschedulePage implements OnInit {

  customAlertOptions: any = {
    header: 'Contacts',
  
    translucent: true
  };
  date: any = '';
  time: any = '';
  dob: any  = '';
  errors : any  = ['',null,undefined];
  loading:any;
  // signupForm: FormGroup;
  minDate: any;
  profile: any;
  calls: any;
  personalProfile: any = JSON.parse(localStorage.getItem('profile'));
  callDetails:  any = JSON.parse(localStorage.getItem('call'));
  constructor(public modalCtrl: ModalController, public toastController: ToastController, public userService: UserService, public loadingController: LoadingController, public router: Router, private platform: Platform, private globalFooService: GlobalFooService, public socket: Socket) {

  	
   }

  ngOnInit()
  {
  	console.log(this.callDetails);
  	this.socket.connect();
    let todayDate = new Date();
    let localDate = todayDate.getFullYear() + '-' + '0'+todayDate.getMonth() +'-'+ todayDate.getDate();
    this.minDate = localDate;
    console.log(this.minDate) 
    this.profile = JSON.parse(localStorage.getItem('profile'));

    // this.createForm(); 
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  createForm() {
    // this.signupForm = this.fb.group({
    //   date:  [''],
    //   time: ['']
    // });
  }

  addCall(){

      if(this.errors.indexOf(this.date) >= 0){
        this.presentToast('Please select date.','danger');
        return false;
      }

      if(this.errors.indexOf(this.time) >= 0){
        this.presentToast('Please select time.','danger');
        return false;
      }

      let dict = {
        'id': this.callDetails.id,
        'date': this.date,
        'time': this.time,
        // 'user': this.personalProfile.firstname + ' ' + this.personalProfile.lastname
      };

      console.log(dict)
      this.userService.postData(dict,'updateCall').subscribe((result) => {
        if(result.status == 1)
        {
          console.log(result);
          this.calls = result.data;
          this.globalFooService.publishSomeData({
            foo: {'data': result.data, 'page': 'profileView'}
          });
          this.presentToast('Call has been re-scheduled successfully.', 'success');

          this.modalCtrl.dismiss({
            'dismissed': true
          });
        }else{
          this.presentToast('Problem Found','danger');
        }
      },
      err => {
        this.stopLoading();
          this.presentToast('Technical error,Please try after some time.','danger');
      });
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
}
