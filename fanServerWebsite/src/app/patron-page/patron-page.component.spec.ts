import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronPageComponent } from './patron-page.component';

describe('PatronPageComponent', () => {
  let component: PatronPageComponent;
  let fixture: ComponentFixture<PatronPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatronPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
