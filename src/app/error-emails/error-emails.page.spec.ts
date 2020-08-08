import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErrorEmailsPage } from './error-emails.page';

describe('ErrorEmailsPage', () => {
  let component: ErrorEmailsPage;
  let fixture: ComponentFixture<ErrorEmailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorEmailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorEmailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
