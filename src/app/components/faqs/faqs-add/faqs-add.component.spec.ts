import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsAddComponent } from './faqs-add.component';

describe('FaqsAddComponent', () => {
  let component: FaqsAddComponent;
  let fixture: ComponentFixture<FaqsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
