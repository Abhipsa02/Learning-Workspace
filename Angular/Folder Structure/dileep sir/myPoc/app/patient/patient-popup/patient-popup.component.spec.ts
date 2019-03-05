import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPopupComponent } from './patient-popup.component';

describe('PatientPopupComponent', () => {
  let component: PatientPopupComponent;
  let fixture: ComponentFixture<PatientPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
