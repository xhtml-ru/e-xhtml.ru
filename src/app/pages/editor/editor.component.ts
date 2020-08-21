import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { debounceTime } from 'rxjs/operators';

import { EditorActions } from 'src/app/store/editor.actions';
import { EditorModel } from 'src/app/interface/editor.interface';
import { EditorService } from 'src/app/services/editor.service';
import { IframeService } from 'src/app/services/iframe.service';

@Component({
  selector: 'e-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

  state: EditorModel;
  subscriptions = [];
  autoRun: boolean;
  windowMessageBinded: (arg0: Event) => void;


  constructor(
    private editorService: EditorService,
    private iframeService: IframeService,
    private store: Store,
    private sanitizer: DomSanitizer
  ) {
    this.windowMessageBinded = this.windowMessage.bind(this);
   }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }

  @HostListener('window:message', ['$event'])
  onMessage($event: Event) {
    this.windowMessageBinded($event);
  }

  windowMessage($event: any) {
    this.iframeService.listenIframe($event);
    // const { data = {} as PostMessage } = $event;
    // this._editorSrvc.addLog(data);
  }


  init() {
    const resizeEvent = document.createEvent('HTMLEvents');
    resizeEvent.initEvent('resize', true, false);
    this.store.dispatch(new EditorActions.InitPad());
    const pads = this.store.select(state => state.editorState)
      .pipe().subscribe(res => {
        this.state = res;
        this.autoRun = res.autoRun;
        setTimeout(() => {
          // reinit monaco editor layout, resize needed
          document.dispatchEvent(resizeEvent);
        });
      });
    const codes = this.store.select(state => state.codeState)
      .pipe(
        debounceTime(300)
      ).subscribe(res => {
        if (this.autoRun) {
          this.editorService.run();
        }
      });
    // сохраняем подписку для отписки
    this.subscriptions.push(pads);
    this.subscriptions.push(codes);
  }

  getStyle(pad: string, key: string) {
    const conf = 'conf';
    const start = 'start';
    const end = 'end';
    const { editorPads } = this.state;
    return this.sanitizer.bypassSecurityTrustStyle(editorPads[pad][conf][key][start] + '/' + editorPads[pad][conf][key][end]);
  }

  isVisiblePad(key: string) {
    const { editorPads } = this.state;
    return editorPads[key].conf.visible;
  }

  isActivePad(key: string) {
    const { activePad } = this.state;
    return key === activePad;
  }

}
