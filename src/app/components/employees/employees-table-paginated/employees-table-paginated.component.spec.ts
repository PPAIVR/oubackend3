import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesTablePaginatedComponent } from './employees-table-paginated.component';

describe('EmployeesTablePaginatedComponent', () => {
  let component: EmployeesTablePaginatedComponent;
  let fixture: ComponentFixture<EmployeesTablePaginatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesTablePaginatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesTablePaginatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
