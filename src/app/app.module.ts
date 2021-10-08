import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Http, HttpModule, RequestOptions } from '@angular/http';
import { CustomRequestOptions } from './services/CustomRequestOptions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WebrtcService } from './providers/webrtc.service';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';


import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
//const config: SocketIoConfig = { url: 'http://35.153.16.86', options: {} };
const config: SocketIoConfig = { url: 'http://18.191.231.244:3001', options: {} };



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    HttpModule,
    FormsModule,
    // CountdownTimerModule.forRoot()
  ],
  providers: [
    StatusBar,
    FileTransfer,File,ImagePicker, 
    SplashScreen,
    WebrtcService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: RequestOptions, useClass: CustomRequestOptions },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
