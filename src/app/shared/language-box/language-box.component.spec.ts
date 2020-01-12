import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageBoxComponent } from './language-box.component';

describe('LanguageBoxComponent', () => {
  let component: LanguageBoxComponent;
  let fixture: ComponentFixture<LanguageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
