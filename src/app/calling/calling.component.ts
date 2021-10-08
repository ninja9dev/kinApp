import { Component, OnInit, ElementRef } from '@angular/core';
import { ModalController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { WebrtcService } from '../providers/webrtc.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-calling',
  templateUrl: './calling.component.html',
  styleUrls: ['./calling.component.scss'],
})
export class CallingComponent implements OnInit {
	errors : any  = ['',null,undefined];
  	loading: any;
  	receiver: any;
  	senderId: any;
  	receiverId: any; 
  	chat: any = [];
  	otherUser = JSON.parse(localStorage.getItem('profile'));
  	userId: any = localStorage.getItem('sin_auth_token');
  	text: any = '';
  	startVideo = true;
  	topVideoFrame = 'partner-video';
	// userId: string;
	partnerId: string = localStorage.getItem('chatWithUser');
	myEl: HTMLMediaElement;
	partnerEl: HTMLMediaElement;
	user: any = localStorage.getItem('user');
    constructor(public webRTC: WebrtcService, public elRef: ElementRef, public modalCtrl: ModalController, public toastController: ToastController, public userService: UserService, public loadingController: LoadingController, public router: Router, private platform: Platform, public socket: Socket) {
    	this.myEl = self.elRef.nativeElement.querySelector('#my-video');
	    this.partnerEl = self.elRef.nativeElement.querySelector('#partner-video');
	    this.webRTC.init(self.userId, self.myEl, self.partnerEl);
	    this.webRTC.call(self.partnerId);
	    this.swapVideo('my-video');

    }

    
  	ngOnInit()
  	{
  		// this.myEl = this.elRef.nativeElement.querySelector('#my-video');
	   //  this.partnerEl = this.elRef.nativeElement.querySelector('#partner-video');
	    // this.webRTC.init(this.userId, this.myEl, this.partnerEl);
	  	this.socket.connect();
	  // 	console.log('here')
	 	this.socket.emit('chat_message', {});
	    this.socket.fromEvent('message').subscribe((message,any) => {
	    	console.log("ALL"+message);
	    	if(message.msg.event == 'start'){
	    		if(this.userId == message.msg.receiver)
		    	{
		    		if (confirm("Calling From "+message.msg.user.firstname+" "+message.msg.user.lastname))
		    		{
				  		this.receiveCall();
					}else{
					  this.socket.emit('send-message', {'user': this.otherUser, 'receiver': self.partnerId, 'event': 'close'});
					}
		    		
		    	}   
	    	}
	    	else{
	    		// if(this.userId == message.msg.receiver)
		    	// {
		    		this.disconnectCall();
		    	// }
	    	}
	    	
	    });
	  	// let self = this;
	   //  setInterval(function(){

	   //  	// self.presentLoading();
	  	// 	let dict = {
		  //     	'userId':   localStorage.getItem('sin_auth_token'),
	   //    		'receiverId': localStorage.getItem('chatWithUser'),
		  //   };
		  //   console.log('here')
		  //   self.userService.postData(dict,'getChat').subscribe((result: any) => {
		  //   	// self.stopLoading();
		  //     	if(result.status == 1)
		  //     	{
		  //     		// if(result.data.chat.length > 0){
		  //     		// 	let chatArrayLength = self.chat.length - 1;
		  //     		// 	if(self.chat.length < result.data.chat.length){
		  //     		// 		for(var i = chatArrayLength; i < result.data.length; i++){
		  //     		// 			self.chat.push(result.data.chat[i]);
		  //     		// 			console.log(self.chat)
		  //     		// 		}
		  //     		// 	}
		  //     		// }
		  //       	self.chat = result.data.chat;
		  //       	// self.receiver = result.data.receiver;
		  //     	}
		  //     	else
		  //     	{
		  //       	// self.presentToast('Something went wrong.Please try later.','danger');
		  //     	}
		  //   },
		  //   err => {
	   //      	// self.presentToast('Technical error,Please try after some time.','danger');
		  //   });
	   //  }, 20000);


  	} 

  	openChat()
  	{
  		this.presentLoading();
  		let dict = {
	      	'userId':   localStorage.getItem('sin_auth_token'),
      		'receiverId': localStorage.getItem('chatWithUser'),
	    };

	    this.userService.postData(dict,'getChat').subscribe((result) => {
	    	this.stopLoading();
	      	if(result.status == 1)
	      	{
	        	this.chat = result.data.chat;
	        	this.receiver = result.data.receiver;
	      	}
	      	else
	      	{
	        	this.presentToast('Something went wrong.Please try later.','danger');
	      	}
	    },
	    err => {
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

    sendMessage(text){
    	this.presentLoading();
    	let dict = {
	      	'senderId':   localStorage.getItem('sin_auth_token'),
      		'receiverId': localStorage.getItem('chatWithUser'),
      		'text': text,
      		'media': null
	    };

	    this.userService.postData(dict,'saveMessage').subscribe((result) => {
	    	this.stopLoading();
	      	if(result.status == 1)
	      	{
	        	this.chat.push(result.data);
	        	//this.socket.emit('chat_message', result.data);

        	    this.text = "";
	      	}
	      	else
	      	{
	        	this.presentToast('Something went wrong.Please try later.','danger');
	      	}
	    },
	    err => {
        	this.presentToast('Technical error,Please try after some time.','danger');
	    });
    }

// VIDEO STYFF BELOW ----------------------------------------

  	call()
  	{
	  	this.startVideo = true;
	  	let self = this;
	  	this.socket.emit('send-message', {'user': this.otherUser, 'receiver': self.partnerId, 'event': 'start'});
	  	setTimeout(function(){
	  		self.myEl = self.elRef.nativeElement.querySelector('#my-video');
		    self.partnerEl = self.elRef.nativeElement.querySelector('#partner-video');
		    self.webRTC.init(self.userId, self.myEl, self.partnerEl);
		    self.webRTC.call(self.partnerId);
		    self.swapVideo('my-video');
	  	}, 1000);
	  	
  	}

  	receiveCall()
  	{
	  	this.startVideo = true;
	  	let self = this;

	  	setTimeout(function(){
	  		self.myEl = self.elRef.nativeElement.querySelector('#my-video');
		    self.partnerEl = self.elRef.nativeElement.querySelector('#partner-video');
		    self.webRTC.init(self.userId, self.myEl, self.partnerEl);
		    self.webRTC.call(self.partnerId);
		    self.swapVideo('my-video');
	  	}, 1000);
	  	
  	}

  	// disconnect(){
   //  	this.router.navigate(['/tabs/chats']);
   //  }

  	disconnect()
  	{
  		this.socket.emit('send-message', {'user': this.otherUser, 'receiver': self.partnerId, 'event': 'close'});
  		this.webRTC.close();
  		this.startVideo = false;
  	}

  	disconnectCall(){
  		// this.socket.emit('send-message', {'user': this.otherUser, 'receiver': self.partnerId, 'event': 'close'});
  		this.webRTC.close();
  		this.startVideo = false;
  	}

	  swapVideo(topVideo: string) {
	    this.topVideoFrame = topVideo;
	  }

// -------------------------------------------------------------

}
