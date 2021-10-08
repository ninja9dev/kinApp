import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { GlobalFooService } from '../services/user/globalFooService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  errors : any = ['',null,undefined];
	email:any = '';
	password:any = ''; 
	fullname:any = ''; 
	loading:any;
  	constructor(public toastController: ToastController, public userService: UserService, public loadingController: LoadingController, public router: Router, private platform: Platform, private globalFooService: GlobalFooService) { }

  	ngOnInit() {
	}

  	login(email,password){
	    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  	if(this.errors.indexOf(email) >= 0){
	  		this.presentToast('Please enter your email address.','danger');
	  		return false;
	  	}else if(!re.test(String(email).toLowerCase())){
	      this.presentToast('Please enter valid email address.','danger');
	      return false;
	    }else if(this.errors.indexOf(password) >= 0){
	  		this.presentToast('Please enter your password.','danger');
	  		return false;
	  	}

	    let dict = {
	      email:  email,
	      password: password
	    };
	  	
	  	this.userService.postData(dict,'login').subscribe((result) => {
	  		if(result.status == 1)
	  		{
	  			this.fullname = result.data.firstname +' '+ result.data.lastname;
	  			var userId = result.data._id;
		        localStorage.setItem('sin_auth_token',userId);
		        localStorage.setItem('IsLoggedInKin','true');
		        localStorage.setItem('sin_auth_user_name',this.fullname);
		        localStorage.setItem('sin_auth_user_image',result.data.image);
		        localStorage.setItem('profile', JSON.stringify(result.data));

		        this.stopLoading();
		        this.email = '';
		        this.password = '';
		        
		        this.globalFooService.publishSomeData({
		            foo: {'data': result.data, 'page': 'post'}
	          	});

				this.presentToast('Login successfully!','success');
				this.router.navigate(['/tabs/homenew']);
	  		}
	      	else{
	  			this.presentToast('Invalid logged in details','danger');
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
