import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunCtrlComponent } from './run-ctrl.component';
import { NgxsModule } from '@ngxs/store';
import { EditorState } from 'src/app/store/editor.state';
import { CodeState } from 'src/app/store/code.state';
import { LogState } from 'src/app/store/log.state';

describe('RunCtrlComponent', () => {
  let component: RunCtrlComponent;
  let fixture: ComponentFixture<RunCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([EditorState, CodeState, LogState]),
      ],

      declarations: [ RunCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
