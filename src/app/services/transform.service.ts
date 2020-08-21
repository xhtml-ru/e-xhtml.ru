import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { PadCode } from '../interface/editor.interface';
import { CodeActions } from '../store/code.actions';

@Injectable({
  providedIn: 'root'
})
export class TransformService {

  constructor(
    private store: Store,
  ) { }

  /**
   * Sets status of code to 'transform'
   *
   * @param type - key from CodeStapes, enum [html|css|js]
   */
  onTransformStart(type: string) {
    this.store
      .dispatch(new CodeActions.UpdateStatus({ type, status: 'transform' }));
  }

  /**
   * Send transformed code to store
   *
   * @param dist - code string with html or js or css
   * @param type - key from CodeStapes, enum [html|css|js]
   */
  updateDist(dist: string, type: string) {
    this.store
      .dispatch(new CodeActions.UpdateDist({ dist, type }));
  }


  /**
   * Safe dom parser, return correct html
   * @param str - html string
   */
  parseStrToDom(str: string) {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.body.innerHTML;
  }


  /**
   * Transform to javascript
   *
   * @param code PadCode
   */
  async js(code: PadCode) {
    if (code.status === 'transform') {
      return;
    }
    this.onTransformStart('js');
    const transformer = code.transformer;
    switch (transformer) {
      case 'typescript':
        this.store.selectOnce((state) => state.monacoState)
          .subscribe(({ editors }) => {
            const MONACO = window['monaco'];
            const model = editors.js.editor.getModel();
            MONACO.languages.typescript.getTypeScriptWorker()
              .then((worker) => {
                worker(model.uri)
                  .then((client) => {
                    client.getEmitOutput(model.uri.toString())
                      .then((res) => {
                        const data = res.outputFiles[0].text;
                        this.updateDist(this.parseStrToDom(data), 'js');
                      });
                  });
              });
          });

      break;
      default:
        this.updateDist(code.src, 'js');
        break;
    }



    this.updateDist(code.src, 'js');
 }

  /**
   * Transform to html
   * @param code PadCode
   */
  async html(code: PadCode) {
    if (code.status === 'transform') {
      return;
    }
    this.onTransformStart('html');
    const transformer = code.transformer;
    switch (transformer) {
      case 'pug':
        const workerPug = new Worker('./../webworkers/transform-pug.worker', { type: 'module' });
        workerPug.onmessage = ({ data }) => {
          this.updateDist(this.parseStrToDom(data), 'html');
          workerPug.terminate();
        };
        workerPug.postMessage(code.src);
        break;
      case 'markdown':
        const workerMd = new Worker('./../webworkers/transform-markdown.worker', { type: 'module' });
        workerMd.onmessage = ({ data }) => {
          this.updateDist(this.parseStrToDom(data), 'html');
          workerMd.terminate();
        };
        workerMd.postMessage(code.src);
        break;
        default:
          this.updateDist(this.parseStrToDom(code.src), 'html');
        break;
      }
  }

  /**
   * Transform to css
   *
   * @param code PadCode
   */
  async css(code: PadCode) {
    if (code.status === 'transform') {
      return;
    }
    this.onTransformStart('css');
    const transformer = code.transformer;
    switch (transformer) {
      case 'scss':
        const workerScss = new Worker('./../webworkers/transform-sass.worker', { type: 'module' });
        workerScss.onmessage = ({ data }) => {
          this.updateDist(data, 'css');
          workerScss.terminate();
        };
        workerScss.postMessage(code.src);
        break;
      default:
        this.updateDist(code.src, 'css');
        break;
    }

  }

}
