import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminColsPage } from './admin-cols.page';

describe('AdminColsPage', () => {
  let component: AdminColsPage;
  let fixture: ComponentFixture<AdminColsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminColsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminColsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
