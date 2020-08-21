import { LogEntry } from '../interface/editor.interface';

// tslint:disable-next-line: no-namespace
export namespace LogActions {

  export class AddLog {
    static readonly type = '[LogActions] AddLog';
    constructor(public log: LogEntry) { }
  }

  export class ClearLog {
    static readonly type = '[LogActions] ClearLog';
    constructor() { }
  }
}
