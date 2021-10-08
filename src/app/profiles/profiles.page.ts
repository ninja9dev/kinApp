import { Component, OnInit } from '@angular/core';
import { AddnewcallPage } from '../addnewcall/addnewcall.page';
import { AddmembersPage } from '../addmembers/addmembers.page';

import { ModalController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalFooService } from '../services/user/globalFooService.service';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
})
export class ProfilesPage implements OnInit {
  selectedItem:any = 'item1';
  profiles: any = [];

  errors : any  = ['',null,undefined];
  loading:any;
  signupForm: FormGroup;
  imageUrl: any = 'http://18.191.231.244:3000/images/';
  
  constructor(public modalController: ModalController, public toastController: ToastController, public userService: UserService, public loadingController: LoadingController, public router: Router, private platform: Platform, public fb: FormBuilder, private globalFooService: GlobalFooService) {

      this.globalFooService.getObservable().subscribe((data) => {
        console.log('Data received', data);
        if(data.foo.page == 'profile')
        {
          this.getData();
        }
      });
  }

  ngOnInit()
  {
    let self = this;
    self.getData();
    // setInterval(function(){
    //   self.getData(); 
    // }, 2000);
  }

  viewProfilePage(profile)
  {
    localStorage.setItem('clickedProfile',JSON.stringify(profile));
    this.router.navigate(['/viewprofile']);
  }
  getData()
  {
    let dict = {
      'userId': localStorage.getItem('sin_auth_token')
    };
    this.userService.postData(dict,'getProfiles').subscribe((result) => {
      if(result.status == 1)
      {
        console.log(result);
        this.profiles = result.data;
      }
      else{
        this.presentToast('Error while signing up! Please try later.','danger');
      }
    },
    err => {
      this.stopLoading();
        this.presentToast('Technical error,Please try after some time.','danger');
    });

    // if(localStorage.getItem('profiles') != 'null'){
    //   this.profiles = JSON.parse(localStorage.getItem('profiles'));
    // }
    // console.log(this.profiles)
  }

    async presentModal(profileID)
    {
      localStorage.setItem('profile_id',profileID);
      
      const modal = await this.modalController.create({
        component: AddnewcallPage,
        cssClass: 'my-custom-class'
      });
      return await modal.present();
    }

    async presentModal2() 
    {
      const modal = await this.modalController.create({
        component: AddmembersPage,
        cssClass: 'add-members'
      });

      /*modal.onDidDismiss(data => {
        console.log(data);
      });*/

      return await modal.present();
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
