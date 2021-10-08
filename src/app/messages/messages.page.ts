import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalController, ToastController, LoadingController,IonContent, Platform } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { FormGroup, Validators } from '@angular/forms';
import { WebrtcService } from '../providers/webrtc.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'], 
})
export class MessagesPage implements OnInit {
		@ViewChild(IonContent, {read: IonContent, static: false}) myContent: IonContent;

	errors : any  = ['',null,undefined];
  	loading: any;
  	receiver: any;
  	senderId: any;
  	receiverId: any; 
  	chat: any = [];
  	otherUser = JSON.parse(localStorage.getItem('profile'));
  	userId: any = localStorage.getItem('sin_auth_token');
  	text: any = '';
  	// startVideo = false;
  	// topVideoFrame = 'partner-video';
	// userId: string;
	// partnerId: string = localStorage.getItem('chatWithUser');
	// myEl: HTMLMediaElement;
	// partnerEl: HTMLMediaElement;
	user: any = localStorage.getItem('user');
 	listing: any;
 	data: any;
  	friendId: any = localStorage.getItem('friendId');
  	// baseUrl: any = config.IMAGES_URL;
  	// userId: any = localStorage.getItem('sin_auth_token');
  	// text: any;
	 // callStarted: any = 0;
    constructor(public location:Location, public webRTC: WebrtcService, public elRef: ElementRef, public modalCtrl: ModalController, public toastController: ToastController, public userService: UserService, public loadingController: LoadingController, public router: Router, private platform: Platform, public socket: Socket) {
    	
    	// this.socket.fromEvent('message').subscribe(message => {
	    // 	console.log(m  essage)
	    // 	alert('calling');   
	    // });

	    
	    // this.startVideo = localStorage.getItem('calling');
	    // console.log(this.startVideo);
	    // if(localStorage.getItem('calling') == 'true')
	    // {
	    // 	this.call();
	    // }else if(localStorage.getItem('start') == 'false'){
	    // 	this.receiveCall();
	    // }else{
	    // 	this.openChat();
	    // }

    }

    dismiss(){
  		if(localStorage.getItem('previos') == 'true'){
  			this.location.back();
  			this.location.back();
  		}else{
  			this.location.back();
  		}
  	}
    
  	ngOnInit()
  	{
  		this.getData();
  		// this.myEl = this.elRef.nativeElement.querySelector('#my-video');
	   //  this.partnerEl = this.elRef.nativeElement.querySelector('#partner-video');
	    // this.webRTC.init(this.userId, this.myEl, this.partnerEl);
	  // 	this.socket.connect();
	  // // 	console.log('here')
	 	// this.socket.emit('chat_message', {});
	  //   this.socket.fromEvent('message').subscribe((message: any) => {
	  //   	console.log("ALL"+message);
	  //   	if(message.msg.event == 'start'){
	  //   		if(this.userId == message.msg.receiver)
		 //    	{
		 //    		if (confirm("Calling From "+message.msg.user.firstname+" "+message.msg.user.lastname))
		 //    		{
			// 	  		// this.receiveCall();
			// 		}else{
			// 		  this.socket.emit('send-message', {'user': this.otherUser, 'receiver': self.partnerId, 'event': 'close'});
			// 		}
		    		
		 //    	}   
	  //   	}
	  //   	else{
	  //   		// if(this.userId == message.msg.receiver)
		 //    	// {
		 //    		localStorage.setItem('start', 'null');
		 //    		localStorage.setItem('calling', 'null');
		 //    		// this.disconnectCall();
		 //    		this.location.back();
		 //    	// }
	  //   	}
	    	
	  //   });
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

  	getData(){
      this.presentLoading();
      this.userService.postData({'receiverId': this.friendId,'chatId': localStorage.getItem('chatId'), 'userId': this.userId},'listMessages').subscribe((result) => {
        this.stopLoading();
        console.log(result)
        if(result.status == 1){
          this.data = result.data;
          console.log(this.data);
          this.myContent.scrollToBottom(300);
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

  	openChat()
  	{
  		// alert('here')
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

    // sendMessage(text){
    // 	this.presentLoading();
    // 	let dict = {
	   //    	'senderId':   localStorage.getItem('sin_auth_token'),
    //   		'receiverId': localStorage.getItem('chatWithUser'),
    //   		'text': text,
    //   		'media': null
	   //  };

	   //  this.userService.postData(dict,'saveMessage').subscribe((result) => {
	   //  	this.stopLoading();
	   //    	if(result.status == 1)
	   //    	{
	   //      	this.chat.push(result.data);
	   //      	//this.socket.emit('chat_message', result.data);

    //     	    this.text = "";
	   //    	}
	   //    	else
	   //    	{
	   //      	this.presentToast('Something went wrong.Please try later.','danger');
	   //    	}
	   //  },
	   //  err => {
    //     	this.presentToast('Technical error,Please try after some time.','danger');
	   //  });
    // }

     sendMessage(text){
    	if(this.errors.indexOf(text) >= 0){
	  		this.presentToast('Please enter your message.','danger');
	  		return false;
	  	}

	  	var dict = {
	  		'receiverId': this.friendId, 
	  		'senderId': this.userId,
	  		'text': text,
	  		'isMedia': false,
	  		'media': null,
	  		'chatId': localStorage.getItem('chatId')
	  	};

  		this.presentLoading();
      	this.userService.postData(dict,'saveMessage').subscribe((result) => {
	        this.stopLoading();
	        console.log(result)
	        if(result.status == 1){
	          this.data.chat.push(dict);this.text = '';
	          // this.sendNotification(result.data._id);
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

    sendNotification(id){
    	var dict = {
	  		'receiverId': localStorage.getItem('friendId'), 
	  		'senderId': localStorage.getItem('sin_auth_token'),
	  		'type': 'chat',
	  		'id': localStorage.getItem('chatId')
	  	};

    	this.userService.postData(dict,'saveNotification').subscribe((result) => {
	        // this.stopLoading();
	        console.log(result);
	      },
	      err => {
	        console.log(err);
	      });
    }

// VIDEO STYFF BELOW ----------------------------------------

  	// call()
  	// {
	  // 	this.startVideo = true;
	  // 	let self = this;
	  // 	this.socket.emit('send-message', {'user': this.otherUser, 'receiver': self.partnerId, 'event': 'start'});
	  // 	setTimeout(function(){
	  // 		self.myEl = self.elRef.nativeElement.querySelector('#my-video');
		 //    self.partnerEl = self.elRef.nativeElement.querySelector('#partner-video');
		 //    self.webRTC.init(self.userId, self.myEl, self.partnerEl);
		 //    self.webRTC.call(self.partnerId);
		 //    self.swapVideo('my-video');
	  // 	}, 1000);
	  	
  	// }

  	// receiveCall()
  	// {
	  // 	this.startVideo = true;
	  // 	let self = this;

	  // 	setTimeout(function(){
	  // 		self.myEl = self.elRef.nativeElement.querySelector('#my-video');
		 //    self.partnerEl = self.elRef.nativeElement.querySelector('#partner-video');
		 //    self.webRTC.init(self.userId, self.myEl, self.partnerEl);
		 //    self.webRTC.call(self.partnerId);
		 //    self.swapVideo('my-video');
	  // 	}, 1000);
	  	
  	// }

  	// disconnect(){
   //  	this.router.navigate(['/tabs/chats']);
   //  }

  	// disconnect()
  	// {
  	// 	this.socket.emit('send-message', {'user': this.otherUser, 'receiver': self.partnerId, 'event': 'close'});
  	// 	this.webRTC.close();
  	// 	this.startVideo = false;
  	// 	// this.location.back();
  	// }

  	// disconnectCall(){
  	// 	this.webRTC.close();
  	// 	this.startVideo = false;
  	// }

	  // swapVideo(topVideo: string) {
	  //   this.topVideoFrame = topVideo;
	  // }

// -------------------------------------------------------------

}
