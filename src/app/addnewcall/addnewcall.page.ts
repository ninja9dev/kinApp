import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalFooService } from '../services/user/globalFooService.service';

@Component({
  selector: 'app-addnewcall',
  templateUrl: './addnewcall.page.html',
  styleUrls: ['./addnewcall.page.scss'],
})
export class AddnewcallPage implements OnInit {

  customAlertOptions: any = {
    header: 'Contacts',
  
    translucent: true
  };
  profile: any;
  name: any = '';
  room: any = '';
  dob: any  = '';
  profiles: any = [];
  calls: any = [];
  errors : any  = ['',null,undefined];
  loading:any;
  contacts:any;
  signupForm: FormGroup;
  minDate: any;
  personalProfile: any = JSON.parse(localStorage.getItem('profile'));

  constructor(public modalCtrl: ModalController, public toastController: ToastController, public userService: UserService, public loadingController: LoadingController, public router: Router, private platform: Platform, public fb: FormBuilder, private globalFooService: GlobalFooService) { }

  ngOnInit()
  {
    let todayDate = new Date();
    let localDate = todayDate.getFullYear() + '-' + '0'+todayDate.getMonth() +'-'+ todayDate.getDate();
    this.minDate = localDate;
    console.log(this.minDate) 
    this.profile = JSON.parse(localStorage.getItem('profile'));
    console.log(this.profile)
    //this.contacts = JSON.parse(localStorage.getItem('contacts'));

    let dict = {
      'userId': localStorage.getItem('sin_auth_token')
    };
    this.userService.postData(dict,'getContacts').subscribe((result) => {
      if(result.status == 1)
      {
       
        this.contacts = result.data;
      }
      else{
        this.presentToast('No any contact found','danger');
      }
    },
    err => {
      this.stopLoading();
        this.presentToast('Technical error,Please try after some time.','danger');
    });

    this.createForm(); 
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  createForm() {
    this.signupForm = this.fb.group({
      contact: [''],
      date:  [''],
      time: ['']
    });
  }

  addCall(){
     if(this.errors.indexOf(this.signupForm.controls.contact.value) >= 0){
        this.presentToast('Please select contact.','danger');
        return false;
      }

      if(this.errors.indexOf(this.signupForm.controls.date.value) >= 0){
        this.presentToast('Please select date.','danger');
        return false;
      }

      if(this.errors.indexOf(this.signupForm.controls.time.value) >= 0){
        this.presentToast('Please select time.','danger');
        return false;
      }

      let dict = {
        'contact': this.signupForm.controls.contact.value,
        'date': this.signupForm.controls.date.value,
        'time': this.signupForm.controls.time.value,
        'userId': localStorage.getItem('sin_auth_token'),
        'profileId': localStorage.getItem('profile_id'),
        'user': this.personalProfile.firstname + ' ' + this.personalProfile.lastname
      };
      this.userService.postData(dict,'addCall').subscribe((result) => {
        if(result.status == 1)
        {
          console.log(result);
          this.calls = result.data;
          this.globalFooService.publishSomeData({
            foo: {'data': result.data, 'page': 'profileView'}
          });
          this.presentToast('Call has been scheduled successfully. '+result.error, 'success');

          this.modalCtrl.dismiss({
            'dismissed': true
          });

          let dict = {
            'userId': localStorage.getItem('sin_auth_token')
          };
          this.userService.postData(dict,'getCalls').subscribe((result) => {
            if(result.status == 1)
            {
              console.log(result);
              this.calls = result.data;
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
        else{
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
