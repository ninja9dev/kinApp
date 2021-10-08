import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
	errors : any = ['',null,undefined];
	loading:any;
  	constructor(public toastController: ToastController, public userService: UserService, public loadingController: LoadingController, public router: Router) { }

  	ngOnInit() {
  	} 
  	sendEmail(email){  

		if(this.errors.indexOf(email) >= 0){
	  		this.presentToast('Please enter your email address.','danger');
	  		return false;
	  	}

	  	var reg= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  	if(!reg.test(String(email).toLowerCase()) && email != undefined && email != ''){
	  		this.presentToast('Please enter valid email address.','danger');
    		return false;
	  	}
	  	
	  	this.presentLoading();
	  	this.userService.postData({email:email},'forgot_password').subscribe((result) => {
	  		this.stopLoading();
	  		if(result.status == 1){
	  			this.presentToast('Password has been sent to your email address!','success');
	  			// localStorage.setItem('email', email);
	  			this.router.navigate(['/login']);
	  		}
	  		else{
	  			this.presentToast('We\'re sorry. We weren\'t able to identify you given the information provided.','danger');
	  		}
	  	},
	    err => {
	    	this.stopLoading();
	        this.presentToast('Technical error,Please try after some time.','danger');
	    });
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
  	}

  	async presentToast(message,color) {
	    const toast = await this.toastController.create({
	      message: message,
	      duration: 3000,
	      position: 'bottom',
	      color: color,
	      //showCloseButton: true
	    });
	    toast.present();
  	}

  	async presentLoading() {
	    this.loading = await this.loadingController.create();
	    await this.loading.present();
  	}

}
