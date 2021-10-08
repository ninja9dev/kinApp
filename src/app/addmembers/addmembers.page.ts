import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalFooService } from '../services/user/globalFooService.service';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';


@Component({
  selector: 'app-addmembers',
  templateUrl: './addmembers.page.html',
  styleUrls: ['./addmembers.page.scss'], 
})
export class AddmembersPage implements OnInit {
  name: any = '';
  room: any = '';
  dob: any  = '';
  image: any  = '';
  imageUrl: any = 'http://18.191.231.244:3000/images/';
  profiles: any;
  errors : any  = ['',null,undefined];
  loading:any;
  signupForm: FormGroup;
  private win: any = window;
  
  constructor(private transfer: FileTransfer, private file: File, private imagePicker: ImagePicker, public modalCtrl: ModalController, public toastController: ToastController, public userService: UserService, public loadingController: LoadingController, public router: Router, private platform: Platform, public fb: FormBuilder, private globalFooService: GlobalFooService) { }

  ngOnInit()
  {
    this.createForm();
  }
  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  createForm() {
    this.signupForm = this.fb.group({
      name: [''],
      dob:  [''],
      room: ['']
    });
  }

  
  saveProfile()
  {
    if(this.errors.indexOf(this.signupForm.controls.name.value) >= 0){
        this.presentToast('Please enter name.','danger');
        return false;
      }

      if(this.errors.indexOf(this.signupForm.controls.room.value) >= 0){
        this.presentToast('Please enter room number.','danger');
        return false;
      }

      if(this.errors.indexOf(this.signupForm.controls.dob.value) >= 0){
        this.presentToast('Please enter date of birth.','danger');
        return false;
      }

      if(this.image == ''){
        this.presentToast('Please select image for profile.','danger');
        return false;
      }

      this.uploadFile();      
  }

  saveData(imagename){
     let dict = {
        'name': this.signupForm.controls.name.value,
        'room': this.signupForm.controls.room.value, 
        'dob':  this.signupForm.controls.dob.value,
        'userId': localStorage.getItem('sin_auth_token'),
        'image': imagename
      };

      this.userService.postData(dict,'addProfile').subscribe((result) => {
        if(result.status == 1)
        {
          this.globalFooService.publishSomeData({
            foo: {'data': result.data, 'page': 'profile'}
          });

          this.signupForm.reset();
          this.presentToast('Profile added successfully!','success');
          this.modalCtrl.dismiss();
        }
        else{
          this.presentToast('Profile name already exist','danger');
        }
      },
      err => {
        this.stopLoading();
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


    uploadFile(){
      console.log('here')
    // Destination URL
    // var url = config.API_URL + "/addPost";
    var url = "http://18.191.231.244:3000/upload_image";

    // File for Upload
    var targetPath = this.image;
    // var targetPath = '';

    // File name only
    var filename = targetPath.split("/").pop();
    let user_id  = localStorage.getItem('sin_auth_token');
    var options: FileUploadOptions = {
      fileKey: "image",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers :{
          Connection: "close"
        },
      params: {  }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    this.presentLoading();

    //Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      var string = data.response;
      string = string.replace(/['"]+/g, '');
      console.log(string)
      this.saveData(string);
      this.stopLoading();
     }, err => {
      this.stopLoading();
      console.log(err)
      alert(JSON.stringify(err));
    });
  };

  openImagePicker(){
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      this.image = results[0];
        // this.crop.crop(imagePath, {quality: 75}).then(newImage => {
      console.log('new image path is: ' + results[0])
      // this.image = newImage.split('?')[0];
      // this.profileData.image = newImage;
    // },
    // error => {
    //   console.error('Error cropping image', error)  
    // });
    }, (err) => { console.log(err) });
  }

   imagePath(image){
      let img =  this.win.Ionic.WebView.convertFileSrc(image);
      // let img =  '';
      return img;
    }

}
