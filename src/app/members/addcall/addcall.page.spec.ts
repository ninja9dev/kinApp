import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddcallPage } from './addcall.page';

describe('AddcallPage', () => {
  let component: AddcallPage;
  let fixture: ComponentFixture<AddcallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcallPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddcallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
