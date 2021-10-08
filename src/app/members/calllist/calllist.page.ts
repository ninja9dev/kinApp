import { Component, OnInit } from '@angular/core';
import { AddcallPage } from '../addcall/addcall.page';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-calllist',
  templateUrl: './calllist.page.html',
  styleUrls: ['./calllist.page.scss'],
})
export class CalllistPage implements OnInit {

  constructor(public modalController: ModalController) { }
  async presentModal2() {
    const modal = await this.modalController.create({
      component: AddcallPage,
      cssClass: 'add-call'
    });
    return await modal.present();
  }
  ngOnInit() {
  }

}
