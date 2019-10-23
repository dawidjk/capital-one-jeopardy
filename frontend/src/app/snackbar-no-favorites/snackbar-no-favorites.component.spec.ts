import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarNoFavoritesomponent } from './snackbar-no-favorites.component';

describe('SnackbarSearchComponent', () => {
  let component: SnackbarNoFavoritesomponent;
  let fixture: ComponentFixture<SnackbarNoFavoritesomponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarNoFavoritesomponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarNoFavoritesomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
