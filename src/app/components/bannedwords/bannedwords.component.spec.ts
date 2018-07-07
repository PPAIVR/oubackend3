import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedwordsComponent } from './bannedwords.component';

describe('BannedwordsComponent', () => {
  let component: BannedwordsComponent;
  let fixture: ComponentFixture<BannedwordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannedwordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannedwordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
