import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceAsideComponent } from './place-aside.component';

describe('PlaceAsideComponent', () => {
  let component: PlaceAsideComponent;
  let fixture: ComponentFixture<PlaceAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
