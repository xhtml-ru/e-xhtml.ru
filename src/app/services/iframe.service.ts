import {
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';
import { Store } from '@ngxs/store';
import { LogActions } from '../store/log.actions';
import { LogEntry, PostMessage } from '../interface/editor.interface';

@Injectable({
  providedIn: 'root'
})
export class IframeService {

  private renderer: Renderer2;

  sandboxAttributes = [
    'allow-modals',
    'allow-forms',
    'allow-pointer-lock',
    'allow-popups',
    'allow-same-origin',
    'allow-scripts'
  ];

  iframeHolder: Node;
  iframe: { contentWindow: { document: { open: () => void; write: (arg0: string) => void; close: () => void; }; }; };

  constructor(
    rendererFactory: RendererFactory2,
    private store: Store,
    ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setHTML(obj: any) {
    if (!this.iframeHolder) {
      return;
    }
    let html: string;

    if (typeof obj === 'string') {
      html = obj;
    } else {
      const {
        head = '', body = ''
      } = obj;
      html = `<!DOCTYPE html><html><head>${head}</head><body>${body}</body></html>`;
    }

    this.iframe = this.createIframe(this.iframeHolder);
    // console.log(iframe)
    // console.log(html)
    setTimeout(() => {
      this.iframe.contentWindow.document.open();
      this.iframe.contentWindow.document.write(html);
      this.iframe.contentWindow.document.close();
    });

  }

  removeIframe() {
    // console.log('iframeHolder')
    // console.log(this.renderer.selectRootElement(iframeHolder))
    if (this.iframeHolder && this.iframe) {
      this.renderer.removeChild(this.iframeHolder, this.iframe);
    }
  }

  createIframe(iframeHolder: Node) {
    if (!iframeHolder) {
      return;
    }
    this.iframeHolder = iframeHolder;
    this.renderer.selectRootElement(this.iframeHolder);
    this.removeIframe();
    const iframe = this.renderer.createElement('iframe');
    this.renderer.setAttribute(iframe, 'sandbox', this.sandboxAttributes.join(' '));
    this.renderer.setAttribute(iframe, 'scrolling', 'yes');
    this.renderer.appendChild(this.iframeHolder, iframe);
    return iframe;
  }

  clearLog() {
    this.store.dispatch(new LogActions.ClearLog());
  }
  addLog(log: LogEntry) {
    this.store.dispatch(new LogActions.AddLog(log));
  }

  async listenIframe($event: any) {
    const { data = {} as PostMessage } = $event;
    if (!data.eXHTML) {
      return;
    }
    // console.clear();
    if (data.type === 'iframe-error') {
      this.addLog({ method: 'error', message: data.message.trim() });
    } else if (data.type === 'eXHTML-console') {
      if (data.method === 'clear') {
        this.clearLog();
      } else {
        const argMess = data.args ? data.args.join(' ') : '';
        this.addLog({ method: data.method, message: data.message.trim() + ' ' + argMess, args: data.args });
      }
    // } else if (data.type === 'eXHTML-make-output-active') {
    // } else if (data.type === 'eXHTML-set-boilerplate' && data.boilerplate) {
    }
  }


}
