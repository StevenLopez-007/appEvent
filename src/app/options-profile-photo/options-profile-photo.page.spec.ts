import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OptionsProfilePhotoPage } from './options-profile-photo.page';

describe('OptionsProfilePhotoPage', () => {
  let component: OptionsProfilePhotoPage;
  let fixture: ComponentFixture<OptionsProfilePhotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsProfilePhotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsProfilePhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
