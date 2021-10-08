import { Component, OnInit } from '@angular/core';
import { AddContactPage } from '../add-contact/add-contact.page';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
selectedItem:any = 'item1';
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddContactPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
