import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrvcComponent } from './srvc.component';

describe('SrvcComponent', () => {
  let component: SrvcComponent;
  let fixture: ComponentFixture<SrvcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrvcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
