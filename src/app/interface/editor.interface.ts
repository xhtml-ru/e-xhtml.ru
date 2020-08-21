export interface PadOptions {
  active: boolean; // активность кнопки настроек
  transformers?: {
    id: string;
    title: string;
    }[]; // доступные трансформеры
}
export interface PadConfig {
  visible: boolean; // видимость окна редактора
  visSwitcher: boolean; // надо ли управлять видимостью
  row: { // css grid позиция по вертикали
    start: number;
    end: number;
  };
  column: { // css grid позиция по горизонтали
    start: number;
    end: number;
  };
}

export interface PadEditor {
  options?: any;
  // language === PadModel.type по умолчанию
  // или language === PadCode.transformer
}

export interface PadModel {
  title: string;
  type: string;
  conf: PadConfig;      // настройки окна
  editor?: PadEditor;   // настройки редактирования
  options?: PadOptions; // настройки трансформаций
}

export interface PadsModel {
  html: PadModel;
  css: PadModel;
  js: PadModel;
  output: PadModel;
  console: PadModel;
  srvc?: PadModel;
}


export interface EditorModel {
  emptyPads: {};
  editorPads: PadsModel;
  activePad: string;
  autoRun: boolean;
  editorStatus: string;
}


export interface PadCode {
  src: string;
  dist?: string;
  status: 'init' | 'wait' | 'transform' | 'ready';
  transformer?: string; // выбранный трансформер
}
export interface CodeModel {
  code: {
    html: PadCode;
    css: PadCode;
    js: PadCode,
  },
}



export interface LogEntry {
  method: string;
  message: string;
  args?: any[];
}

export interface LogModel {
  logs: LogEntry[];
}

export interface PostMessage {
  eXHTML: true;  // отсечь чужие сообщения
  args?: any;    // набор аргуметов лога
  type?: string; //
  message?: string;
  method?: any;  // метод log, warn...
}



export interface OptionsDialogData {
  type: string;
}


export interface MonacoEditor {
  type: string;
  editor?: any;
}

export interface MonacoModel {
  editors: {
    html: MonacoEditor;
    css: MonacoEditor;
    js: MonacoEditor;
  }
}