import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReschedulePage } from './reschedule.page';

describe('ReschedulePage', () => {
  let component: ReschedulePage;
  let fixture: ComponentFixture<ReschedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReschedulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReschedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
