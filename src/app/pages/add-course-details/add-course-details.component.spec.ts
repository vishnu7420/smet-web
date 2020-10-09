import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseDetailsComponent } from './add-course-details.component';

describe('AddCourseDetailsComponent', () => {
  let component: AddCourseDetailsComponent;
  let fixture: ComponentFixture<AddCourseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
