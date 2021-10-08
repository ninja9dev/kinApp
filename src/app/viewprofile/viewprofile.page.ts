import { Component, OnInit } from '@angular/core';
import { CallwaitPage } from '../callwait/callwait.page';
import { AddnewcallPage } from '../addnewcall/addnewcall.page';

import { AddContactPage } from '../members/add-contact/add-contact.page';
// import { ModalController } from '@ionic/angular';
import { GlobalFooService } from '../services/user/globalFooService.service';

import { ModalController, ToastController, LoadingController, Platform, AlertController } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.page.html',
  styleUrls: ['./viewprofile.page.scss'],
})
export class ViewprofilePage implements OnInit {
  selectedItem:any = 'item1';
  contacts:any;
  callsAll:any;
  calls:any;
  loading:any;
  profiles:any;
  clickedProfile:any = JSON.parse(localStorage.getItem('clickedProfile'));
  imageUrl: any = 'http://18.191.231.244:3000/images/';

  eventSource;
  viewTitle;
  isToday: boolean;
  listing: any = [];
  startVideo: any;
  partnerId: any = localStorage.getItem('chatWithUser');
  myEl: HTMLMediaElement;
  partnerEl: HTMLMediaElement;
  user: any = localStorage.getItem('user');
  userId: any;
  topVideoFrame: any;
  otherUser: any;
  profile: any = JSON.parse(localStorage.getItem('profile'));
  
  constructor(public socket: Socket,public modalController: ModalController, public toastController: ToastController, public userService: UserService, public loadingController: LoadingController, public router: Router, private platform: Platform, public fb: FormBuilder, private globalFooService: GlobalFooService, public alertController: AlertController)
  { 

    this.globalFooService.getObservable().subscribe((data) => {
        console.log('Data received', data);
        if(data.foo.page == 'profileView')
        {
          let dict = {
            'userId': localStorage.getItem('sin_auth_token'),
            'profileId': localStorage.getItem('profile_id'),
          };
          this.userService.postData(dict,'getProfileCalls').subscribe((result) => {
            if(result.status == 1)
            {
              this.callsAll = result.data;
            }
            else{
              this.presentToast('No data found','danger');
            }
          },
          err => {
            this.stopLoading();
              this.presentToast('Technical error,Please try after some time.','danger');
          });
        }else{
          let dict = {
            'userId': localStorage.getItem('sin_auth_token'),
            'profileId': localStorage.getItem('profile_id'),
          };
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
        }
      });
  }

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
      let dict = {
        'userId': localStorage.getItem('sin_auth_token'),
        'profileId': this.clickedProfile._id,
      };
      this.userService.postData(dict,'getProfileCalls').subscribe((result) => {
        if(result.status == 1)
        {
          console.log(result);
          this.callsAll = result.data;
        }
        else{
          this.presentToast('No any call found','danger');
        }
      },
      err => {
        this.stopLoading();
          this.presentToast('Technical error,Please try after some time.','danger');
      });

    // GET PROFILE DATA ---------------------------------
      let dict1 = {
        'profileId': this.clickedProfile._id,
      };
      this.userService.postData(dict1,'getProfileByID').subscribe((result) => {
        if(result.status == 1)
        {
          console.log(result.data[0].name);
          this.profiles = result.data[0];

        }
        else{
          this.presentToast('No data found','danger');
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
  }

/*  async presentModal() {
    const modal = await this.modalController.create({
      component: CallwaitPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }*/

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
                    'userId': localStorage.getItem('sin_auth_token'),
                    'profileId': localStorage.getItem('profile_id'),
                  };
                  this.userService.postData(dict,'getProfileCalls').subscribe((result) => {
                    if(result.status == 1)
                    {
                      console.log(result);
                      this.callsAll = result.data;
                    }
                    else{
                      this.presentToast('No any call found','danger');
                    }
                  },
                  err => {
                    this.stopLoading();
                      this.presentToast('Technical error,Please try after some time.','danger');
                  });

                  this.stopLoading();
                }
                else
                {
                  this.presentToast('No any call found','danger');
                  this.stopLoading();
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
        component: AddContactPage,
        cssClass: 'Add-Contact'
      });
      return await modal.present();
    }

    countdown(date)
    {
      return;
      console.log(date);
      console.log('here')
      let countDownDate = new Date("Oct 29, 2022 14:50:25").getTime();
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
      console.log(item)
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
}
