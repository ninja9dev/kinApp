import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { CallwaitPage } from './callwait/callwait.page';

// import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  userId: any;
  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox', 
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  otherUser: any;
  partnerId: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public socket: Socket,
    public router: Router,
    public modalController: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    this.socket.connect();
    //  console.log('here')
    this.socket.emit('chat_message', {});
      this.socket.fromEvent('message').subscribe((message: any) => {
       this.hendleSocket(message); 
      });

      if(localStorage.getItem('IsLoggedInKin') == 'true'){
        this.router.navigate(['/tabs/homenew']);
      }else{
        this.router.navigate(['/login']);
      }
  }

  async hendleSocket(message){
     this.userId = localStorage.getItem('sin_auth_token');
        console.log("ALL"+message);
        if(message.msg.event == 'open'){
          if(this.userId == message.msg.data.contactUserId)
          {
            localStorage.setItem('call', JSON.stringify(message.msg.data));
            localStorage.setItem('name', JSON.stringify(message.msg.user));
            const modal = await this.modalController.create({
              component: CallwaitPage,
              cssClass: 'add-members'
            });

              /*modal.onDidDismiss(data => {
                console.log(data);
              });*/

            return await modal.present();
          //   if (confirm("Calling From "+message.msg.user.firstname+" "+message.msg.user.lastname))
          //   {
          //     //this.receiveCall();
          //     localStorage.setItem('calling', 'false');
          //     localStorage.setItem('chatWithUser', message.msg.user._id);
          //     localStorage.setItem('user', message.msg.user.firstname);
          //     localStorage.setItem('start', 'false');
          //     this.router.navigate(['/messages']);
          // }else{
          //   this.socket.emit('send-message', {'user': this.otherUser, 'receiver': this.partnerId, 'event': 'close'});
          // }
            
          }   
        }
        else{
          // if(this.userId == message.msg.receiver)
          // {
            //this.disconnectCall();
          // }
        }
  }
}
