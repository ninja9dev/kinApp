import { Component, OnInit,ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { ModalController, ToastController, LoadingController, Platform, AlertController } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddnewcallPage } from '../addnewcall/addnewcall.page';
import { AddContactPage } from '../members/add-contact/add-contact.page';
import { GlobalFooService } from '../services/user/globalFooService.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
	selectedItem:any 	= 'item1';
  profiles: any 	= [];
  errors :  any  	= ['',null,undefined];
  loading:  any;
  // signupForm: FormGroup;
  calls: any;
  contacts: any;
  loginName: any;
  data: any;
  category: any = 'official';
  constructor(private cd: ChangeDetectorRef, public modalController: ModalController, public toastController: ToastController, public userService: UserService, public loadingController: LoadingController, public router: Router, private platform: Platform, private globalFooService: GlobalFooService, public alertController: AlertController) {
  }

  ngOnInit() {
  	this.getData();
  }

    getData()
    {
      this.presentLoading();

      let dict = {
        'userId': localStorage.getItem('sin_auth_token')
      };
      this.userService.postData(dict,'listNotification').subscribe((result) => {
        if(result.status == 1)
        {
          this.stopLoading();
          console.log(result);
          this.data = result.data;
        }
        else{ 
          this.stopLoading();
          this.presentToast('No any call found','danger');
        }
      }, 
      err => {
        this.stopLoading();
          this.presentToast('Technical error,Please try after some time.','danger');
      });
  };

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
