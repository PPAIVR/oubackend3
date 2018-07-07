import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceAddComponent } from './advice-add.component';

describe('AdviceAddComponent', () => {
  let component: AdviceAddComponent;
  let fixture: ComponentFixture<AdviceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdviceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
