import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreprocessorComponent } from './preprocessor.component';
import { NgxsModule } from '@ngxs/store';
import { EditorState } from 'src/app/store/editor.state';
import { CodeState } from 'src/app/store/code.state';
import { LogState } from 'src/app/store/log.state';

describe('PreprocessorComponent', () => {
  let component: PreprocessorComponent;
  let fixture: ComponentFixture<PreprocessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([EditorState, CodeState, LogState]),
      ],
      declarations: [ PreprocessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreprocessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
