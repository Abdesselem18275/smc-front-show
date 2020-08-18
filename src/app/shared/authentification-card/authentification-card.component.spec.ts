import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentificationCardComponent } from './authentification-card.component';

describe('AuthentificationCardComponent', () => {
  let component: AuthentificationCardComponent;
  let fixture: ComponentFixture<AuthentificationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthentificationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthentificationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
