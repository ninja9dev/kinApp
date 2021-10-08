import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemberschedulePage } from './memberschedule.page';

describe('MemberschedulePage', () => {
  let component: MemberschedulePage;
  let fixture: ComponentFixture<MemberschedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberschedulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberschedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
