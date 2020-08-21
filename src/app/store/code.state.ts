import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { CodeModel } from '../interface/editor.interface';
import { CodeActions } from './code.actions';
import { EditorActions } from './editor.actions';


@Injectable()
@State<CodeModel>({
  name: 'codeState',
  defaults: {
    code: {
      html: {
        src: '',
        // src: 'p\n  | Bla-Bla-Bla\np\n  | Bla-Bla-Bla',
        // src: '<p>\n  Bla-Bla-Bla\n</p>',
        status: 'init',
        transformer: 'none'
      },
      css: {
        src: '',
        // src: 'body {\n    background-color: red;\n      p {\n  color: #fff;\n  }\n}',
        status: 'init',
        transformer: 'none'
      },
      js: {
        src: '',
        // src: 'const d: number = 12;\nconsole.log(d)',
        // src: 'console.log("1234567890")',
        status: 'init',
        transformer: 'none'
      },
    },
  }
})
export class CodeState {

  constructor(
    public store: Store,
  ) { }


  @Action(CodeActions.UpdateCode)
  UpdateCode(ctx: StateContext<CodeModel>, { obj }: CodeActions.UpdateCode) {
    const state = ctx.getState();
    state.code[obj.type].src = obj.src;
    state.code[obj.type].status = obj.status || 'wait';
    ctx.setState({
      ...state,
    });
  }

  @Action(CodeActions.UpdateDist)
  UpdateDist(ctx: StateContext<CodeModel>, { obj }: CodeActions.UpdateDist) {
    const state = ctx.getState();
    state.code[obj.type].dist = obj.dist;
    state.code[obj.type].status = obj.status || 'ready';
    ctx.setState({
      ...state,
    });
  }

  @Action(CodeActions.UpdateStatus)
  UpdateStatus(ctx: StateContext<CodeModel>, { obj }: CodeActions.UpdateStatus) {
    const state = ctx.getState();
    state.code[obj.type].status = obj.status;
    ctx.setState({
      ...state,
    });
  }


  @Action(CodeActions.UpdateTransformer)
  UpdateTransformer(ctx: StateContext<CodeModel>, { obj }: CodeActions.UpdateTransformer) {
    this.store.dispatch(new EditorActions.UpdateEditorLanguage(obj));
    const state = ctx.getState();
    state.code[obj.type].transformer = obj.transformer;
    ctx.setState({
      ...state,
    });
    this.store.dispatch(new CodeActions.UpdateStatus({...obj, ...{status: 'wait'}}));
  }

}
