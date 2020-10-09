import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NetworkStatePage } from './network-state.page';

describe('NetworkStatePage', () => {
  let component: NetworkStatePage;
  let fixture: ComponentFixture<NetworkStatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkStatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkStatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
