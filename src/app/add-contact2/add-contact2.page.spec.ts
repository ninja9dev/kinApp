import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddContact2Page } from './add-contact2.page';

describe('AddContact2Page', () => {
  let component: AddContact2Page;
  let fixture: ComponentFixture<AddContact2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContact2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddContact2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
