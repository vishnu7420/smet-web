import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDegreeComponent } from './add-degree.component';

describe('AddDegreeComponent', () => {
  let component: AddDegreeComponent;
  let fixture: ComponentFixture<AddDegreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDegreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
