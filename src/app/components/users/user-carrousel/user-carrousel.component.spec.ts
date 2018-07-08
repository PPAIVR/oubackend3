import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCarrouselComponent } from './user-carrousel.component';

describe('UserCarrouselComponent', () => {
  let component: UserCarrouselComponent;
  let fixture: ComponentFixture<UserCarrouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCarrouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
