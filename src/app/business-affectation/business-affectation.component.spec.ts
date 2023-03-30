import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAffectationComponent } from './business-affectation.component';

describe('BusinessAffectationComponent', () => {
  let component: BusinessAffectationComponent;
  let fixture: ComponentFixture<BusinessAffectationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAffectationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
