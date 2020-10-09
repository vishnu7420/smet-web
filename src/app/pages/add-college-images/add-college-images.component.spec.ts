import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollegeImagesComponent } from './add-college-images.component';

describe('AddCollegeImagesComponent', () => {
  let component: AddCollegeImagesComponent;
  let fixture: ComponentFixture<AddCollegeImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCollegeImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollegeImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
