import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { IframeService } from 'src/app/services/iframe.service';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'e-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss', './../pad/pad.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OutputComponent implements OnInit, OnDestroy, AfterViewInit {

  iframeHolder: Node;

  constructor(
    private iframeSrvc: IframeService,
    private editorService: EditorService,
  ) { }

  @ViewChild('outputIframe', {
    static: false
  })
  // получим прямой доступ к редактируемому div
  iframeHolderRef: ElementRef;


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.iframeHolder = this.iframeHolderRef.nativeElement;
    this.iframeSrvc.createIframe(this.iframeHolder);
    setTimeout(() => {
      this.editorService.run();
    })
  }

  ngOnDestroy(): void {

  }

}
