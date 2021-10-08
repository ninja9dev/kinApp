import { Component, OnInit,ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { ModalController, ToastController, LoadingController, Platform, AlertController } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddnewcallPage } from '../addnewcall/addnewcall.page';
import { AddContactPage } from '../members/add-contact/add-contact.page';
import { GlobalFooService } from '../services/user/globalFooService.service';

@Component({
  selector: 'app-homenew',
  templateUrl: './homenew.page.html',
  styleUrls: ['./homenew.page.scss'],
})
export class HomenewPage implements OnInit {
  selectedItem:any 	= 'item1';
  profiles: any 	= [];
  errors :  any  	= ['',null,undefined];
  loading:  any;
  signupForm: FormGroup;
  calls: any;
  contacts: any;
  loginName: any;
  username: any = localStorage.getItem('sin_auth_user_name');
  category: any = 'official';
      
  constructor(private cd: ChangeDetectorRef, public modalController: ModalController, public toastController: ToastController, public userService: UserService, public loadingController: LoadingController, public router: Router, private platform: Platform, public fb: FormBuilder, private globalFooService: GlobalFooService, public alertController: AlertController) {

    this.globalFooService.getObservable().subscribe((data) => {
      console.log('Data received', data);
        
      if(data.foo.page == 'post'){
        this.calls = [];
        this.contacts = [];
        this.loginName = '';
      }
      this.username = localStorage.getItem('sin_auth_user_name');
      this.getData();
    });

  }

  notify(){
    this.router.navigate(['/notification']);
  };

  	ngOnInit()
  	{
      
      this.getData();
  	}

    getData()
    {
      this.presentLoading();

      let dict = {
        'userId': localStorage.getItem('sin_auth_token')
      };
      this.userService.postData(dict,'getCalls').subscribe((result) => {
        if(result.status == 1)
        {
          this.stopLoading();
          console.log(result);
          this.calls = result.data;
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

      // GET ALL CONTACTS -------------------------
      this.userService.postData(dict,'getContacts').subscribe((result) => {
        if(result.status == 1)
        {
          console.log(result);
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

      this.cd.detectChanges();
    }

    logout(){
      localStorage.clear();
      this.router.navigate(['/']);
    }

    async deleteCall(callID)
    {
       
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirmation',
        // subHeader: 'Subtitle',
        message: 'Are you sure you want to delete this scheduled call?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Delete',
            handler: () => {
              this.presentLoading();
              let dict = {
                '_id': callID
              };
              this.userService.postData(dict,'deleteCall').subscribe((result) => {
                if(result.status == 1)
                {
                  this.presentToast('Scheduled call deleted successfully','success');
                  let dict = {
                    'userId': localStorage.getItem('sin_auth_token')
                  };
                  this.userService.postData(dict,'getCalls').subscribe((result) => {
                    if(result.status == 1)
                    {
                      console.log(result);
                      this.calls = result.data;
                      this.stopLoading();
                    }
                    else{
                      this.presentToast('No any call found','danger');
                      this.stopLoading();
                    }
                  },
                  err => {
                    this.stopLoading();
                      this.presentToast('Technical error,Please try after some time.','danger');
                  });
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
          }
        ]
      });

      await alert.present();
      return;
      
    }

    async deleteContact(contactID)
    {

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Confirmation',
        message: 'Are you sure you want to delete this contact?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.presentLoading();
              let dict = {
                '_id': contactID
              };
              this.userService.postData(dict,'deleteContact').subscribe((result) => {
                if(result.status == 1)
                {
                  this.presentToast('Contact deleted successfully','success');
                  let dict = {
                    'userId': localStorage.getItem('sin_auth_token')
                  };
                  this.userService.postData(dict,'getContacts').subscribe((result) => {
                    if(result.status == 1)
                    {
                      console.log(result);
                      this.contacts = result.data;
                      this.stopLoading();
                    }
                    else{
                      this.presentToast('No any contact found','danger');
                      this.stopLoading();
                    }
                  },
                  err => {
                    this.stopLoading();
                      this.presentToast('Technical error,Please try after some time.','danger');
                  });
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
          }
        ]
      });

      await alert.present();
    }

  	async addUser()
    {
	  	const modal = await this.modalController.create({
        component: AddContactPage,
        cssClass: 'add-members'
    	});

      	/*modal.onDidDismiss(data => {
	        console.log(data);
      	});*/

    	return await modal.present();
  	}

  	async addCall(profileID)
    {
      localStorage.setItem('profile_id',profileID);
      
	  	const modal = await this.modalController.create({
	        component: AddnewcallPage,
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
