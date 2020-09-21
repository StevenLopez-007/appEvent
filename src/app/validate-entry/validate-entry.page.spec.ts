import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidateEntryPage } from './validate-entry.page';

describe('ValidateEntryPage', () => {
  let component: ValidateEntryPage;
  let fixture: ComponentFixture<ValidateEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidateEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
