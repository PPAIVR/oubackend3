import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HappystoriesComponent } from './happystories.component';

describe('HappystoriesComponent', () => {
  let component: HappystoriesComponent;
  let fixture: ComponentFixture<HappystoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HappystoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HappystoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
