import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPlaceComponent } from './app-place.component';

describe('AppPlaceComponent', () => {
  let component: AppPlaceComponent;
  let fixture: ComponentFixture<AppPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
