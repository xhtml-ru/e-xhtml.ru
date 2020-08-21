import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadTogglerComponent } from './pad-toggler.component';
import { NgxsModule } from '@ngxs/store';
import { EditorState } from 'src/app/store/editor.state';
import { CodeState } from 'src/app/store/code.state';
import { LogState } from 'src/app/store/log.state';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

describe('PadTogglerComponent', () => {
  let component: PadTogglerComponent;
  let fixture: ComponentFixture<PadTogglerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadTogglerComponent ],
      imports: [
        NgxsModule.forRoot([EditorState, CodeState, LogState]),
        MatButtonToggleModule,
      ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
