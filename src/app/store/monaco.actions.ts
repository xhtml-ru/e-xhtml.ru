import { MonacoEditor } from '../interface/editor.interface';

// tslint:disable-next-line: no-namespace
export namespace MonacoActions {

  export class SetEditor {
    static readonly type = '[MonacoActions] SetEditor';
    constructor(public obj: MonacoEditor) { }
  }

}
