import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestComponent } from './user-request.component';

describe('UserRequestComponent', () => {
  let component: UserRequestComponent;
  let fixture: ComponentFixture<UserRequestComponent>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      declarations: [ UserRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
