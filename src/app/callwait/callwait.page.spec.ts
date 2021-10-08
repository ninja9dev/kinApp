import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CallwaitPage } from './callwait.page';

describe('CallwaitPage', () => {
  let component: CallwaitPage;
  let fixture: ComponentFixture<CallwaitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallwaitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CallwaitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
