import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuscarColModalPage } from './buscar-col-modal.page';

describe('BuscarColModalPage', () => {
  let component: BuscarColModalPage;
  let fixture: ComponentFixture<BuscarColModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarColModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarColModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
