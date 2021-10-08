import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewprofilePage } from './viewprofile.page';

describe('ViewprofilePage', () => {
  let component: ViewprofilePage;
  let fixture: ComponentFixture<ViewprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
