import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividuAccountComponent } from './individu-account.component';

describe('IndividuAccountComponent', () => {
  let component: IndividuAccountComponent;
  let fixture: ComponentFixture<IndividuAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividuAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividuAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
