import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMenuItemComponent } from './product-menu-item.component';

describe('ProductMenuItemComponent', () => {
  let component: ProductMenuItemComponent;
  let fixture: ComponentFixture<ProductMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
