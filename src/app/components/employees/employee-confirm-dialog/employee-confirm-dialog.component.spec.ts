import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeConfirmDialogComponent } from './employee-confirm-dialog.component';

describe('EmployeeConfirmDialogComponent', () => {
  let component: EmployeeConfirmDialogComponent;
  let fixture: ComponentFixture<EmployeeConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
