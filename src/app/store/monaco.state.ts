import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { MonacoModel } from '../interface/editor.interface';
import { MonacoActions } from './monaco.actions';


@Injectable()
@State<MonacoModel>({
  name: 'monacoState',
  defaults: {
    editors: {
      html: {
        type: 'html'
      },
      css: {
        type: 'css'
      },
      js: {
        type: 'js'
      },
    },
  }
})
export class MonacoState {

  constructor(
    public store: Store,
  ) { }


  @Action(MonacoActions.SetEditor)
  UpdateCode(ctx: StateContext<MonacoModel>, { obj }: MonacoActions.SetEditor) {
    const state = ctx.getState();
    state.editors[obj.type].editor = obj.editor;
    ctx.setState({
      ...state,
    });
  }


}
