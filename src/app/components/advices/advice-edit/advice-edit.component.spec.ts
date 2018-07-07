import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceEditComponent } from './advice-edit.component';

describe('AdviceEditComponent', () => {
  let component: AdviceEditComponent;
  let fixture: ComponentFixture<AdviceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdviceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
