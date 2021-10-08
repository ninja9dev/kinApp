import { Injectable } from '@angular/core';
import Peer from 'peerjs';

const constraints: MediaStreamConstraints = {video: true, audio: false};
// declare var Peerjs: any;
@Injectable({
  providedIn: 'root'
})
export class WebrtcService {
  // PeerJs:any;
  myStream: MediaStream;
  myEl: HTMLMediaElement;
  partnerEl: HTMLMediaElement;

  stun = 'stun.l.google.com:19302';
  // mediaConnection: Peer.MediaConnection;
  // options: Peer.PeerJSOption;
  stunServer: RTCIceServer = {
    urls: 'stun:' + this.stun,
  };

   // stun: string = 'stun.l.google.com:19302';
  peer: any; //Peer.Peer;
  mediaConnection: Peer.MediaConnection;
  // myStream: MediaStream;
  // myEl: HTMLMediaElement;
  // partnerEl: HTMLMediaElement;

  // stunServer: RTCIceServer = {
  //   urls: 'stun:' + this.stun,
  // };
  options: Peer.PeerJSOption;

  constructor() {
    // navigator.getUserMedia = navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
    //   || navigator.msGetUserMedia;
    this.options = {
      key: 'cd1ft79ro8g833di',
      debug: 3
    }
  }

  // constructor() {

  //   this.options = {  // not used, by default it'll use peerjs server
  //     key: 'cd1ft79ro8g833di',
  //     debug: 3
  //   };
  // }

  getMedia() {
    navigator.getUserMedia({ audio: true, video: true }, (stream) => {
      this.handleSuccess(stream);
    }, (error) => {
      this.handleError(error);
    });
  }

  async init(userId: string, myEl: HTMLMediaElement, partnerEl: HTMLMediaElement) {
    this.myEl = myEl;
    this.partnerEl = partnerEl;
    try {
      this.getMedia();
    } catch (e) {
      this.handleError(e);
    }
    await this.createPeer(userId);
  }

  async createPeer(userId: string) {
    let self = this;
    this.peer = new Peer(userId);
    this.peer.on('open', () => {
      this.wait();
    });

    // this.peer.on('disconnected', function (conn) {
    //     console.log('Connection lost. Please reconnect');
    //     conn = null;
    //     // this.disconnect();
    //     // self.peer.close()
    //     // Workaround for peer.reconnect deleting previous id
    //     // peer.id = lastPeerId;
    //     // peer._lastServerId = lastPeerId;
    //     // peer.reconnect();
    // });
    // this.peer.on('close', function () {
    //     // conn = null;
    //     console.log('Connection destroyed');
    // });
    // this.peer.on('error', function (err) {
    //     console.log(err);
    // });
  }

  call(partnerId: string) {
    // let demo = this.init();
    const call = this.peer.call(partnerId, this.myStream);
    this.partnerEl.srcObject = this.myStream;
    call.on('stream', (stream) => {
      // this.partnerEl.srcObject = stream;
    });
  }

  wait() {
    this.peer.on('call', (call) => {
      call.answer(this.myStream);
      console.log('here')
      call.on('stream', (stream) => {
        this.partnerEl.srcObject = stream;
      });


    });
  }

  handleSuccess(stream: MediaStream) {
    this.myStream = stream;
    this.myEl.srcObject = stream;
    this.partnerEl.srcObject = stream;
  }

  handleError(error: any) {
    if (error.name === 'ConstraintNotSatisfiedError') {
      const v = constraints.video;
     // this.errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
      this.errorMsg(`The resolution px is not supported by your device.`);
    } else if (error.name === 'PermissionDeniedError') {
      this.errorMsg('Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.');
    }
    this.errorMsg(`getUserMedia error: ${error.name}`, error);
  }
    
  errorMsg(msg: string, error?: any) {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
      console.error(error);
    }
  }
  
  close(){ 
  	const disconnection =  this.peer.disconnect();
    // this.peer.on('close', () => {
    //   this.myStream = null;
    //   this.myEl.srcObject = null;
    // });
  }  
}