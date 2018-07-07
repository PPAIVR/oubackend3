import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedTableComponent } from './banned-table.component';

describe('BannedTableComponent', () => {
  let component: BannedTableComponent;
  let fixture: ComponentFixture<BannedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
