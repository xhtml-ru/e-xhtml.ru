import {
  Injectable
} from '@angular/core';
import { Store } from '@ngxs/store';
import { TransformService } from './transform.service';
import { IframeService } from './iframe.service';
import { ProxyConsole } from './../utils/proxy-console';


@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(
    private store: Store,
    private transformService: TransformService,
    private iframeService: IframeService
  ) {}



  replaceQuote = (str: string) => str.replace(/__QUOTE_LEFT__/g, '<');

  createElement = (tag: any) => (content = '', attrs = {}) => {
    attrs = Object.keys(attrs)
      .map(key => {
        return `${key}="${attrs[key]}"`;
      })
      .join(' ');
    // console.log(content)
    return this.replaceQuote(
      `__QUOTE_LEFT__${tag} ${attrs}>${content}__QUOTE_LEFT__/${tag}>`
    );
  }


  async manRun() {
    let err = false;
    this.store.selectOnce(state => state.codeState.code)
      .subscribe(async (code) => {
        for (const key in code) {
          if (code.hasOwnProperty(key)) {
            if (code[key].status === 'wait') {
              this.transformService[key](code[key]);
              err = true;
              break;
            } else if (code[key].status !== 'ready') {
              err = true;
              break;
            }
          }
        }
        if (err) {
          setTimeout(() => {
            this.manRun();
          }, 500);
        } else {
          this.run();
        }
      });
  }

  async run() {
    let html: any;
    let css: any;
    let js: string;
    const scripts = [];

    this.store.selectOnce(state => state.codeState.code)
      .subscribe(async (code) => {
        for (const key in code) {
          if (code.hasOwnProperty(key)) {
            if (code[key].status === 'wait') {
              this.transformService[key](code[key]);
              return;
            } else if (code[key].status !== 'ready') {
              return;
            }
          }
        }
        try {
          html = code.html.dist || '';
          css = code.css.dist || '';
          js = code.js.dist || '';
          js = js.replace(/<\/script>/, '<\\/script>');
          js = `
              try {
                ${js}
              } catch (err) {
                window.parent.postMessage(
                  {
                    eXHTML: true,
                    type: 'iframe-error',
                    message: err instanceof Error ? (err.frame ? err.message + '\\n' + err.frame : err.stack) : err
                  },
                  '*'
                )
              }
            `;
          js = `
              console.clear();
              document.addEventListener('DOMContentLoaded', __executE);
              function __executE(){
                window.parent.postMessage({
                  eXHTML: true,
                  type: 'iframe-success' }, '*');
                let script = document.createElement('script');
                script.innerHTML = ${JSON.stringify(js)};
                document.body.appendChild(script);
              };`;
        } catch (e) {

        }


        const headStyle = this.createElement('style')(css);
        const eRuntime = this.createElement('script')(`
            window.process = window.process || { env: { NODE_ENV: 'development' } }
            `) +
          scripts
            .map(script =>
              this.createElement('script')('', {
                src: `https://bundle.run/${script.module}${script.path}?name=${
                  script.name
                  }`
              })
            )
            .join('\n') +
              this.createElement('script')('', {
                src: '/assets/js/console-driver.min.js'
              });
          // this.createElement('script')(ProxyConsole) +
          // this.createElement('script')('ProxyConsole();');
        const head = headStyle + eRuntime;
        const body =
          html +
          this.createElement('script')(js);

        this.iframeService.setHTML({
          head,
          body
        });

      });
  }

}
