import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividuCreateComponent } from './individu-create.component';

describe('IndividuCreateComponent', () => {
  let component: IndividuCreateComponent;
  let fixture: ComponentFixture<IndividuCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividuCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividuCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
