import { TestBed } from '@angular/core/testing';

import { IframeService } from './iframe.service';
import { NgxsModule } from '@ngxs/store';
import { EditorState } from '../store/editor.state';
import { CodeState } from '../store/code.state';
import { LogState } from '../store/log.state';

describe('IframeService', () => {
  let service: IframeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([EditorState, CodeState, LogState]),
      ],
    });
    service = TestBed.inject(IframeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
