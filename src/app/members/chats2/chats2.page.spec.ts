import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Chats2Page } from './chats2.page';

describe('Chats2Page', () => {
  let component: Chats2Page;
  let fixture: ComponentFixture<Chats2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chats2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Chats2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
