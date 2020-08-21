import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsDialogComponent } from './options-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { EditorState } from 'src/app/store/editor.state';
import { CodeState } from 'src/app/store/code.state';
import { LogState } from 'src/app/store/log.state';

const model = {};

describe('OptionsDialogComponent', () => {
  let component: OptionsDialogComponent;
  let fixture: ComponentFixture<OptionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        NgxsModule.forRoot([EditorState, CodeState, LogState]),

      ],
      declarations: [ OptionsDialogComponent ],
      providers: [
        {
          // I was expecting this will pass the desired value
          provide: MAT_DIALOG_DATA,
          useValue: model
        },
        {
          provide: MatDialogRef,
          useValue: OptionsDialogComponent
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
