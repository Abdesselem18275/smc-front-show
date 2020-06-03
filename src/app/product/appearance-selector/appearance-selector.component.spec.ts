import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppearanceSelectorComponent } from './appearance-selector.component';

describe('AppearanceSelectorComponent', () => {
  let component: AppearanceSelectorComponent;
  let fixture: ComponentFixture<AppearanceSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppearanceSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppearanceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
