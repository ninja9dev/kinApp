import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalFooService } from '../services/user/globalFooService.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  	errors : any 	= ['',null,undefined];
  	signupForm: FormGroup;
	fname:any 		= '';
	lname:any 		= '';
	email:any 		= '';
	password:any 	= ''; 
	fullname:any 	= ''; 
	cpassword:any 	= ''; 
	gender:any 		= ''; 
	loading:any;
  	constructor(public toastController: ToastController,public formBuilder: FormBuilder, public userService: UserService, public loadingController: LoadingController, public router: Router, private platform: Platform, private globalFooService: GlobalFooService) { }

  	ngOnInit() {
  		this.createForm();
	}

	createForm() {
		this.signupForm = this.formBuilder.group({
			fname: [''],
			lname: [''],
			email: [''],
			contact: [''],
			password: [''],
			gender: ['women'],
			cpassword: ['']
		});
	}

	register()
	{
		console.log(this.signupForm.controls)
		console.log(this.fname)
	  	if(this.errors.indexOf(this.signupForm.controls.fname.value) >= 0){
	  		this.presentToast('Please enter your first name.','danger');
	  		return false;
	  	}

	  	if(this.errors.indexOf(this.signupForm.controls.lname.value) >= 0){
	  		this.presentToast('Please enter your last name.','danger');
	  		return false;
	  	}

	  	if(this.errors.indexOf(this.signupForm.controls.email.value) >= 0){
	  		this.presentToast('Please enter your email address.','danger');
	  		return false;
	  	}
	  	console.log(this.signupForm.controls.email.value)
	  	var reg= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  	if(!reg.test(String(this.signupForm.controls.email.value).toLowerCase()) && this.signupForm.controls.email.value != undefined && this.signupForm.controls.email.value != ''){
	  		this.presentToast('Please enter valid email address.','danger');
	    		return false;
	  	}
	  	
	  	if(this.errors.indexOf(this.signupForm.controls.contact.value) >= 0){
	      this.presentToast('Please enter your phone number.','danger');
	      return false;
	    }

	  	if(this.errors.indexOf(this.signupForm.controls.password.value) >= 0){
	  		this.presentToast('Please enter your password.','danger');
	  		return false;
	  	}
	  	if(this.signupForm.controls.password.value.length < 6){
	  		this.presentToast('Please enter atleast 6 digits password.','danger');
	  		return false;
	  	}
	  	if(this.errors.indexOf(this.signupForm.controls.cpassword.value) >= 0){
	  		this.presentToast('Please enter confirm password.','danger');
	  		return false;
	  	}
	  	if(this.signupForm.controls.password.value != this.signupForm.controls.cpassword.value){
	  		this.presentToast('Password and Confirm password should be same.','danger');
	  		return false;
	  	}
	  	this.presentLoading();
	    let dict ={
	      firstname: this.signupForm.controls.fname.value,
	      lastname: this.signupForm.controls.lname.value,
	      email: this.signupForm.controls.email.value,
	      password: this.signupForm.controls.password.value,
	      gender: this.signupForm.controls.gender.value,
       	  phone: this.signupForm.controls.contact.value,
	      provider:'Direct'
	    };

		// this.stopLoading();
		// this.signupForm.reset();
		// this.presentToast('Registered successfully!','success');
		// this.router.navigate(['/tabs/profiles']);

	    // return;
	  	this.userService.postData(dict,'registerUser').subscribe((result) => {
	  		if(result.status == 1){
	  			this.fullname = result.data.firstname +' '+ result.data.lastname;

	  			var userId = result.data._id;
		        localStorage.setItem('sin_auth_token',userId);
		        localStorage.setItem('IsLoggedInKin','true');
		        localStorage.setItem('sin_auth_user_name',this.fullname);
		        localStorage.setItem('sin_auth_user_image',result.data.image);
		        localStorage.setItem('profile', JSON.stringify(result.data));

		        this.globalFooService.publishSomeData({
		            foo: {'data': result.data, 'page': 'post'}
	          	});

		        this.stopLoading();
		        this.signupForm.reset();
				this.presentToast('Registered successfully!','success');
				this.router.navigate(['/tabs/homenew']);
	  		}
	      	else{
	      		this.stopLoading();
	  			this.presentToast(result.error ,'danger');
	  		}
	  	},
	    err => {
	    	this.stopLoading();
	        this.presentToast('Technical error,Please try after some time.','danger');
	    });
	}

  	// login(email,password){
	  //   let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  // 	if(this.errors.indexOf(email) >= 0){
	  // 		this.presentToast('Please enter your email address.','danger');
	  // 		return false;
	  // 	}else if(!re.test(String(email).toLowerCase())){
	  //     this.presentToast('Please enter valid email address.','danger');
	  //     return false;
	  //   }else if(this.errors.indexOf(password) >= 0){
	  // 		this.presentToast('Please enter your password.','danger');
	  // 		return false;
	  // 	}

	  //   let dict = {
	  //     email:  email,
	  //     password: password
	  //   };
	  // 	this.presentLoading();
	  // 	this.userService.postData(dict,'loginUser').subscribe((result) => {
	  // 		this.stopLoading();
	  // 		if(result.status == 1){
	  // 			this.email = '';
	  // 			this.password = '';
	  // 			this.presentToast('Login successfully!','success');
	  // 			var userId = result.data._id;
	  //       	localStorage.setItem('sin_auth_token', userId);
	  //       	localStorage.setItem('IsLoggedInKin', 'true');
	  //       	localStorage.setItem('sin_auth_user_name', result.data.name);
	  // 			localStorage.setItem('sin_auth_user_image', result.data.image);
	  // 			localStorage.setItem('profile', JSON.stringify(result.data));
	  // 			this.router.navigate(['/tabs/homenew']);
	  // 			//routerLink="/tabs/homenew"
	  // 		}
	  // 		else if(result.status == 2){
	  // 			this.presentToast('Your account is not active!','danger');
	  // 		}
	  // 		else{
	  // 			this.presentToast('Invalid credentials!','danger');
	  // 		}
	  // 	},
	  //   err => {
	  //   	this.stopLoading();
	  //       this.presentToast('Technical error,Please try after some time.','danger');
	  //   });
  	// };

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
