import { TestBed } from '@angular/core/testing';

import { TransformService } from './transform.service';
import { NgxsModule } from '@ngxs/store';
import { EditorState } from '../store/editor.state';
import { CodeState } from '../store/code.state';
import { LogState } from '../store/log.state';

describe('TransformService', () => {
  let service: TransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([EditorState, CodeState, LogState]),
      ],
    });
    service = TestBed.inject(TransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
