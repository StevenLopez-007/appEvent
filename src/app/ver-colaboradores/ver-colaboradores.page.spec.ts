import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerColaboradoresPage } from './ver-colaboradores.page';

describe('VerColaboradoresPage', () => {
  let component: VerColaboradoresPage;
  let fixture: ComponentFixture<VerColaboradoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerColaboradoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerColaboradoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
