import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { EditorService } from 'src/app/services/editor.service';
import { debounceTime } from 'rxjs/operators';
import { LogEntry } from 'src/app/interface/editor.interface';

@Component({
  selector: 'e-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss', './../pad/pad.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConsoleComponent implements OnInit, OnDestroy, AfterViewInit {

  consoleOutput: any;
  consoleLog: SafeHtml;
  subscriptions = [];

  constructor(
    private store: Store,
    private editorSrvc: EditorService,
    private sanitizer: DomSanitizer,
  ) {
  }
  @ViewChild('consoleOutput', {
    static: false
  })
  // получим прямой доступ к редактируемому div
  consoleOutputRef: ElementRef;

  ngAfterViewInit() {
    this.consoleOutput = this.consoleOutputRef.nativeElement;
    const ls = this.store.select(state => state.logState)
      .pipe(
        debounceTime(100)
      )
      .subscribe(async ({ logs }) => {
        let logHtml = '';
        logs.forEach((log: LogEntry) => {
          logHtml += `<div class="cl cl-${log.method}">${log.message}</div>`;
        });
        this.consoleLog = this.sanitizer.bypassSecurityTrustHtml(logHtml);
        setTimeout(() => {
          this.consoleOutput.scrollTop = this.consoleOutput.scrollHeight;
        });
      });
    // сохраняем подписку для отписки
    this.subscriptions.push(ls);
  }

  ngOnInit(): void {
    this.consoleLog = this.sanitizer.bypassSecurityTrustHtml('');
  }

  ngOnDestroy(): void {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }

}
