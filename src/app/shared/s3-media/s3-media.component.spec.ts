import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { S3MediaComponent } from './s3-media.component';

describe('S3MediaComponent', () => {
  let component: S3MediaComponent;
  let fixture: ComponentFixture<S3MediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ S3MediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(S3MediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
