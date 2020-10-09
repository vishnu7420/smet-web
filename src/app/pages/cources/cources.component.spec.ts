import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourcesComponent } from './cources.component';

describe('CourcesComponent', () => {
  let component: CourcesComponent;
  let fixture: ComponentFixture<CourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
