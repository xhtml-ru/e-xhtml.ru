
// tslint:disable-next-line: no-namespace
export namespace CodeActions {

  export class UpdateCode {
    static readonly type = '[CodeActions] UpdateCode';
    constructor(public obj: any) { }
  }

  export class UpdateDist {
    static readonly type = '[CodeActions] UpdateDist';
    constructor(public obj: any) { }
  }

  export class UpdateStatus {
    static readonly type = '[CodeActions] UpdateStatus';
    constructor(public obj: any) { }
  }

  export class UpdateTransformer {
    static readonly type = '[CodeActions] UpdateTransformer';
    constructor(public obj: any) { }
  }

}
