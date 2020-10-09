import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollegeCourseComponent } from './add-college-course.component';

describe('AddCollegeCourseComponent', () => {
  let component: AddCollegeCourseComponent;
  let fixture: ComponentFixture<AddCollegeCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCollegeCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollegeCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
