
// tslint:disable-next-line: no-namespace
export namespace EditorActions {

  export class TogglePad {
    static readonly type = '[EditorActions] TogglePad';
    constructor(public key: string) { }
  }

  export class InitPad {
    static readonly type = '[EditorActions] InitPad';
    constructor() { }
  }

  export class UpdateCode {
    static readonly type = '[EditorActions] UpdateCode';
    constructor(public obj: any) { }
  }

  export class UpdateEditorLanguage {
    static readonly type = '[EditorActions] UpdateEditorLanguage';
    constructor(public obj: any) { }
  }


  export class SetAutoRun {
    static readonly type = '[EditorActions] SetAutoRun';
    constructor(public val: boolean) { }
  }
  
}
