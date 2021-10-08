import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms'; 
import { GlobalFooService } from '../services/user/globalFooService.service';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.page.html',
  styleUrls: ['./userlist.page.scss'],
})
export class UserlistPage implements OnInit {
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
  users:any;
  // chat:any;
  listing:any;
  // baseUrl: any = config.IMAGES_URL;
  userId: any = localStorage.getItem('sin_auth_token');
  constructor(private globalFooService: GlobalFooService, public modalCtrl: ModalController, public toastController: ToastController, public userService: UserService, public loadingController: LoadingController, public router: Router, private platform: Platform) { }

  	ngOnInit()
  	{
      this.getData();

	  	/*let dict = {
	      'userId': localStorage.getItem('sin_auth_token')
	    };
	    this.userService.postData(dict,'getUsersList').subscribe((result) => {
	      if(result.status == 1)
	      {
	        console.log(result);
	        this.users = result.data;
	      }
	      else{
	        this.presentToast('Something went wrong.Please try later.','danger');
	      }
	    },
	    err => {
	        this.presentToast('Technical error,Please try after some time.','danger');
	    });*/

    // --- TIMER CODE --------------------
      // let countDownDate = new Date("Oct 29, 2019 14:50:25").getTime();
      // let x = setInterval(function () 
      // {
      //   // Get todays date and time
      //   let now = new Date().getTime();
      //   // Find the distance between now and the count down date
      //   let distance = countDownDate - now;
      //   // Time calculations for days, hours, minutes and seconds
      //   let days   = Math.floor(distance / (1000 * 60 * 60 * 24));
      //   let hours  = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      //   let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      //   let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      //   console.log(now, "now", "countDownDate", countDownDate, "distance", distance, "days", days);

      //   // Output the result in an element with id="demo"
      //   document.getElementById("demo").innerHTML = days + "d " + hours + "h "
      //     + minutes + "m " + seconds + "s ";

      //   // If the count down is over, write some text 
      //   if (distance < 0) {
      //     clearInterval(x);
      //     document.getElementById("demo").innerHTML = "<b style='color:red;'>EXPIRED</b>";
      //   }
      // }, 1000);

  	}

    getData(){
      //
      this.presentLoading();
      this.userService.postData({'userId': this.userId},'getContacts').subscribe((result) => {
        this.stopLoading();
        if(result.status == 1){
          this.listing = result.data;
        }
        else{
          this.presentToast('Technical error,Please try after some time.','danger');
        }
      },
      err => {
        this.stopLoading();
          this.presentToast('Technical error,Please try after some time.','danger');
      });
    }

  	// CHAT OPEN---------------------------------------------------
  	openChat(item)
  	{
    //   localStorage.setItem('calling', 'false');
    //   localStorage.setItem('start', 'true');
  		// localStorage.setItem('chatWithUser', item._id);
    //   localStorage.setItem('user', item.name)
  		// this.router.navigate(['/messages']);
  		if(item.isAppUser){
  			localStorage.setItem('previos', 'true');
	  		let dict = {
		      	userId: localStorage.getItem('sin_auth_token'),
		      	receiverId:  item.receiverId
		    };
		    this.presentLoading();
		    this.userService.postData(dict,'createChat').subscribe((result) => {
		      this.stopLoading();
		      	if(result.status == 1){
		         	console.log(result);
		         	 this.modalCtrl.dismiss({
			            'dismissed': true
			          });
	         	  	this.globalFooService.publishSomeData({
			            foo: {'data': result.data, 'page': 'chat'}
		          	});
		         	localStorage.setItem('friendId', result.data.receiverId);
		         	localStorage.setItem('chatId', result.data._id);
	    			this.router.navigate(['/messages']);
		      	}else{
		        	this.presentToast('Technical error,Please try after some time.','danger');
		      	}
		    },
		    err => {
		      this.stopLoading();
		        this.presentToast('Technical error,Please try after some time.','danger');
		    });
  		}else{
  			this.presentToast('Selected contact still not app user.','warning');
  		}
  		
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

    async chat(){
    	 this.modalCtrl.dismiss({
            'dismissed': true
          });

    }

}
