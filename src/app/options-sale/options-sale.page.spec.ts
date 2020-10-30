import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OptionsSalePage } from './options-sale.page';

describe('OptionsSalePage', () => {
  let component: OptionsSalePage;
  let fixture: ComponentFixture<OptionsSalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsSalePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsSalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
