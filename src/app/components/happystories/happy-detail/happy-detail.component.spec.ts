import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HappyDetailComponent } from './happy-detail.component';

describe('HappyDetailComponent', () => {
  let component: HappyDetailComponent;
  let fixture: ComponentFixture<HappyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HappyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HappyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
