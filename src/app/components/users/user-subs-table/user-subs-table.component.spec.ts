import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubsTableComponent } from './user-subs-table.component';

describe('UserSubsTableComponent', () => {
  let component: UserSubsTableComponent;
  let fixture: ComponentFixture<UserSubsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSubsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSubsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
