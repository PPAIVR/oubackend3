import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppadminComponent } from './appadmin.component';

describe('AppadminComponent', () => {
  let component: AppadminComponent;
  let fixture: ComponentFixture<AppadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
