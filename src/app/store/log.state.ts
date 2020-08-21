import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { LogModel } from '../interface/editor.interface';
import { LogActions } from './log.actions';

@Injectable()
@State<LogModel>({
  name: 'logState',
  defaults: {
    logs: [
    ],
  }
})
export class LogState {
  constructor(
    public store: Store,
  ) { }

  @Action(LogActions.AddLog)
  AddLog(ctx: StateContext<LogModel>, { log }: LogActions.AddLog) {
    if (log.hasOwnProperty('message')) {
      const state = ctx.getState();
      const logs = state.logs;
      logs.push(log);
      ctx.setState({
        ...state,
        logs
      });
    }
  }


  @Action(LogActions.ClearLog)
  ClearLog(ctx: StateContext<LogModel>, { }: LogActions.ClearLog) {
    const state = ctx.getState();
    state.logs = [];
    ctx.setState({
      ...state,
    });
  }

}
