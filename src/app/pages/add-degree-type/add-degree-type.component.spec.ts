import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDegreeTypeComponent } from './add-degree-type.component';

describe('AddDegreeTypeComponent', () => {
  let component: AddDegreeTypeComponent;
  let fixture: ComponentFixture<AddDegreeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDegreeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDegreeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
