import { Injectable } from '@angular/core';
import { State, Action, StateContext, Store } from '@ngxs/store';
import { EditorModel, PadsModel } from '../interface/editor.interface';
import { EditorActions } from './editor.actions';


@Injectable()
@State<EditorModel>({
  name: 'editorState',
  defaults: {
    emptyPads: {},
    editorPads: {
      html: {
        title: 'HTML',
        type: 'html',
        conf: {
          visible: true,
          visSwitcher: true,
          row: { start: 1, end: 6 },
          column: { start: 1, end: 5 },
        },
        editor: {
          options: {language: 'html'}
        },
        options: {
          active: true,
          transformers: [
            {id: 'none', title : 'None'},
            { id: 'pug', title: 'Pug' },
            { id: 'markdown', title: 'Markdown' }
          ]
        }
      },
      css: {
        title: 'CSS',
        type: 'css',
        conf: {
          visible: true,
          visSwitcher: true,
          row: { start: 6, end: 11 },
          column: { start: 1, end: 5 },
        },
        editor: {
          options: { language: 'css' }
        },
        options: {
          active: true,
          transformers: [
            { id: 'none', title: 'None' },
            { id: 'scss', title: 'Scss' },
          ]
        }
      },
      js: {
        title: 'JS',
        type: 'js',
        conf: {
          visible: true,
          visSwitcher: true,
          row: { start: 1, end: 11 },
          column: { start: 5, end: 9 },
        },
        editor: {
          options: { language: 'javascript' }
        },
        options: {
          active: true,
          transformers: [
            { id: 'none', title: 'None' },
            { id: 'typescript', title: 'TypeScript' },
          ]
        }
      },
      console: {
        title: 'Console',
        type: 'console',
        conf: {
          visible: false,
          visSwitcher: true,
          row: { start: 11, end: 13 },
          column: { start: 1, end: 9 }
        },
      },
      output: {
        title: 'Output',
        type: 'output',
        conf: {
          visible: true,
          visSwitcher: false,
          row: { start: 1, end: 11 },
          column: { start: 9, end: 13 }
        },
      },
      srvc: {
        title: 'ADV',
        type: 'adv',
        conf: {
          visible: true,
          visSwitcher: false,
          row: { start: 11, end: 13 },
          column: { start: 9, end: 13 }
        },
      }
    },
    activePad: 'html',
    autoRun: true,
    editorStatus: 'saved'
  }
})
export class EditorState {

  pads = ['html', 'css', 'js', 'output', 'console'];

  constructor(
    public store: Store,
  ) { }

  @Action(EditorActions.TogglePad)
  TogglePad(ctx: StateContext<EditorModel>, { key }: EditorActions.TogglePad) {
    const state = ctx.getState();
    const pads = state.editorPads;
    pads[key].conf.visible = !pads[key].conf.visible;
    ctx.setState({
      ...state,
      editorPads: this.recountPads(pads)
    });
  }

  @Action(EditorActions.InitPad)
  InitPad(ctx: StateContext<EditorModel>, {}: EditorActions.InitPad) {
    const state = ctx.getState();
    const pads = state.editorPads;
    ctx.setState({
      ...state,
      editorPads: this.recountPads(pads)
    });
  }

  @Action(EditorActions.UpdateCode)
  UpdateCode(ctx: StateContext<EditorModel>, { obj }: EditorActions.UpdateCode) {
    const state = ctx.getState();
    state.editorPads[obj.type].code = obj.code;
    ctx.setState({
      ...state,
    });
  }

  @Action(EditorActions.UpdateEditorLanguage)
  UpdateEditorLanguage(ctx: StateContext<EditorModel>, { obj }: EditorActions.UpdateEditorLanguage) {
    const state = ctx.getState();
    const lang = obj.transformer === 'none' ? obj.type : obj.transformer;
    // FIX js type => monaco javascript language
    state.editorPads[obj.type].editor.options.language = lang === 'js' ? 'javascript' : lang;
    ctx.setState({
      ...state,
    });
  }


  @Action(EditorActions.SetAutoRun)
  ShowPads(ctx: StateContext<EditorModel>, { val }: EditorActions.SetAutoRun) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      autoRun: val
    });
  }


  recountPads(pads: PadsModel) {
    const html = pads.html;
    const css = pads.css;
    const js = pads.js;
    const outp = pads.output;
    const cons = pads.console;
    const srvc = pads.srvc;

    const htmlCssCol = html.conf.visible || css.conf.visible;
    const htmlCssRow = html.conf.visible && css.conf.visible;

    html.conf.row.end = !css.conf.visible && !cons.conf.visible ? 13 : !cons.conf.visible ? 7 : !css.conf.visible ? 11 : 6;
    css.conf.row.start = !html.conf.visible ? 1 : !cons.conf.visible ? 7 : 6;
    css.conf.row.end = !cons.conf.visible ? 13 : 11;
    js.conf.row.end = css.conf.row.end;
    outp.conf.row.end = 11;

    html.conf.column.end = !js.conf.visible && !outp.conf.visible ? 13 : !js.conf.visible || !outp.conf.visible ? 7 : 5;
    css.conf.column.end = html.conf.column.end;
    js.conf.column.start = !htmlCssCol ? 1 : css.conf.column.end;
    js.conf.column.end = !outp.conf.visible ? 13 : !htmlCssCol && outp.conf.visible ? 7 : 9;
    outp.conf.column.start = !htmlCssCol && !js.conf.visible ? 1 :
        js.conf.visible ? js.conf.column.end : htmlCssCol && !js.conf.visible ? css.conf.column.end : 9;
    cons.conf.column.end = htmlCssCol && js.conf.visible ? 9 : 7;
    srvc.conf.column.start = cons.conf.visible ? cons.conf.column.end : outp.conf.column.start;

    return pads;
  }
}
