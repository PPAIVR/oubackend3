import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedAddComponent } from './banned-add.component';

describe('BannedAddComponent', () => {
  let component: BannedAddComponent;
  let fixture: ComponentFixture<BannedAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannedAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannedAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
