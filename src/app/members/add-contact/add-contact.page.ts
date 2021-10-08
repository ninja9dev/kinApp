import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalFooService } from '../../services/user/globalFooService.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
}) 
export class AddContactPage implements OnInit {

  errors : any  = ['',null,undefined];
  loading:any;
  profiles:any;
  signupForm: FormGroup;

  constructor(public modalCtrl: ModalController, public toastController: ToastController, public userService: UserService, public loadingController: LoadingController, public router: Router, private platform: Platform, public fb: FormBuilder, private globalFooService: GlobalFooService) { }

  ngOnInit() {
    this.createForm();
  }
  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  
  addContact()
  {
      if(this.errors.indexOf(this.signupForm.controls.name.value) >= 0)
      {
        this.presentToast('Please enter name.','danger');
        return false;
      }

      if(this.errors.indexOf(this.signupForm.controls.phone.value) >= 0)
      {
        this.presentToast('Please enter phone number.','danger');
        return false;
      }

      let dict = {
        'name': this.signupForm.controls.name.value,
        'phone': this.signupForm.controls.phone.value,
        'userId': localStorage.getItem('sin_auth_token')
      };
      this.userService.postData(dict,'addContact').subscribe((result) => {
        if(result.status == 1)
        {
          console.log(result);
          this.profiles = result.data;  
          this.globalFooService.publishSomeData({
            foo: {'data': result.data, 'page': 'add-post'}
          });
          this.presentToast('Contact added successfully','success');

          this.modalCtrl.dismiss({
            'dismissed': true
          });
        }
        else{
          this.presentToast('Contact name already exist in your list','danger');
        }
      },
      err => {
        this.stopLoading();
          this.presentToast('Technical error,Please try after some time.','danger');
      });

      // if(localStorage.getItem('contacts') != null){
      //   contacts = JSON.parse(localStorage.getItem('contacts'));
      // }

      // contacts.push({'name': this.signupForm.controls.name.value});

      // localStorage.setItem('contacts', JSON.stringify(contacts));
      // this.modalCtrl.dismiss({
      //   'dismissed': true
      // });
  }

  createForm() {
    this.signupForm = this.fb.group({
      name: [''],
      phone: ['']
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
