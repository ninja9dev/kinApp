import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CallingComponent } from './calling.component';

describe('CallingComponent', () => {
  let component: CallingComponent;
  let fixture: ComponentFixture<CallingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CallingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
