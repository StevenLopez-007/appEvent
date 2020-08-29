import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaleTicketPage } from './sale-ticket.page';

describe('SaleTicketPage', () => {
  let component: SaleTicketPage;
  let fixture: ComponentFixture<SaleTicketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleTicketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaleTicketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
