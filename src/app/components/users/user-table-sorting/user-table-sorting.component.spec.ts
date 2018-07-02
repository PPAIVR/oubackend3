import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableSortingComponent } from './user-table-sorting.component';

describe('UserTableSortingComponent', () => {
  let component: UserTableSortingComponent;
  let fixture: ComponentFixture<UserTableSortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTableSortingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
