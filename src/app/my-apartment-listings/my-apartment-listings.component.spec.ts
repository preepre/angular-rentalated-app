import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApartmentListingsComponent } from './my-apartment-listings.component';

describe('MyApartmentListingsComponent', () => {
  let component: MyApartmentListingsComponent;
  let fixture: ComponentFixture<MyApartmentListingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyApartmentListingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApartmentListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
