import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividuListComponent } from './individu-list.component';

describe('IndividuListComponent', () => {
  let component: IndividuListComponent;
  let fixture: ComponentFixture<IndividuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
