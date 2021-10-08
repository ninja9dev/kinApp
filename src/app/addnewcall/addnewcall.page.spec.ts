import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddnewcallPage } from './addnewcall.page';

describe('AddnewcallPage', () => {
  let component: AddnewcallPage;
  let fixture: ComponentFixture<AddnewcallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewcallPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddnewcallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
