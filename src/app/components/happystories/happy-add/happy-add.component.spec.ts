import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HappyAddComponent } from './happy-add.component';

describe('HappyAddComponent', () => {
  let component: HappyAddComponent;
  let fixture: ComponentFixture<HappyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HappyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HappyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
