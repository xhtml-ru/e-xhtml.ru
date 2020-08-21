import { TestBed } from '@angular/core/testing';

import { EditorService } from './editor.service';
import { NgxsModule } from '@ngxs/store';
import { EditorState } from '../store/editor.state';
import { CodeState } from '../store/code.state';
import { LogState } from '../store/log.state';

describe('EditorService', () => {
  let service: EditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([EditorState, CodeState, LogState]),
      ],

    });
    service = TestBed.inject(EditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
