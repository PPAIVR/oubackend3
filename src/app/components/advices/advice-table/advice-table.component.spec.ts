import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceTableComponent } from './advice-table.component';

describe('AdviceTableComponent', () => {
  let component: AdviceTableComponent;
  let fixture: ComponentFixture<AdviceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdviceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
