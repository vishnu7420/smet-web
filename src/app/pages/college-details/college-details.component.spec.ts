import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeDetailsComponent } from './college-details.component';

describe('CollegeDetailsComponent', () => {
  let component: CollegeDetailsComponent;
  let fixture: ComponentFixture<CollegeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
