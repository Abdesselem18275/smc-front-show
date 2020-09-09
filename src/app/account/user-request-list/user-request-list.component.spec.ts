import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserRequestListComponent } from './user-request-list.component';

describe('UserRequestListComponent', () => {
  let component: UserRequestListComponent;
  let fixture: ComponentFixture<UserRequestListComponent>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      declarations: [ UserRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
