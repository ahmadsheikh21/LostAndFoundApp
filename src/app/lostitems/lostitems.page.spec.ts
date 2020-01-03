import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LostitemsPage } from './lostitems.page';

describe('LostitemsPage', () => {
  let component: LostitemsPage;
  let fixture: ComponentFixture<LostitemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostitemsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LostitemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
