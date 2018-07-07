import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HappyTableComponent } from './happy-table.component';

describe('HappyTableComponent', () => {
  let component: HappyTableComponent;
  let fixture: ComponentFixture<HappyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HappyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HappyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
