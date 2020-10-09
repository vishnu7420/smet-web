import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdimagesComponent } from './adimages.component';

describe('AdimagesComponent', () => {
  let component: AdimagesComponent;
  let fixture: ComponentFixture<AdimagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdimagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
