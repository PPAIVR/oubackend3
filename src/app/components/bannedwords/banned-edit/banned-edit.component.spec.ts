import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedEditComponent } from './banned-edit.component';

describe('BannedEditComponent', () => {
  let component: BannedEditComponent;
  let fixture: ComponentFixture<BannedEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannedEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
