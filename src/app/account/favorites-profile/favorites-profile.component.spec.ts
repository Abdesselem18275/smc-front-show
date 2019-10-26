import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesProfileComponent } from './favorites-profile.component';

describe('FavoritesProfileComponent', () => {
  let component: FavoritesProfileComponent;
  let fixture: ComponentFixture<FavoritesProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
