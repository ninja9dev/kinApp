import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addcall',
  templateUrl: './addcall.page.html',
  styleUrls: ['./addcall.page.scss'],
})
export class AddcallPage implements OnInit {
  customAlertOptions: any = {
    header: 'Select User',
  
    translucent: true
  };
  constructor() { }

  ngOnInit() {
  }

}
