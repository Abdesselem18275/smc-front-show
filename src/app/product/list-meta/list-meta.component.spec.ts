import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMetaComponent } from './list-meta.component';

describe('ListMetaComponent', () => {
  let component: ListMetaComponent;
  let fixture: ComponentFixture<ListMetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
