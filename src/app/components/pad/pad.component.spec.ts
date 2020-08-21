import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadComponent } from './pad.component';
import { NgxsModule } from '@ngxs/store';
import { EditorState } from 'src/app/store/editor.state';
import { CodeState } from 'src/app/store/code.state';
import { LogState } from 'src/app/store/log.state';
import { MatDialogModule } from '@angular/material/dialog';

describe('PadComponent', () => {
  let component: PadComponent;
  let fixture: ComponentFixture<PadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        NgxsModule.forRoot([EditorState, CodeState, LogState]),
      ],
      declarations: [ PadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
