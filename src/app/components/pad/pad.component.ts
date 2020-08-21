import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PadModel, PadCode } from 'src/app/interface/editor.interface';
import { Store } from '@ngxs/store';
import { CodeActions } from 'src/app/store/code.actions';
import { MatDialog } from '@angular/material/dialog';
import { OptionsDialogComponent } from './options-dialog/options-dialog.component';
import { MonacoActions } from 'src/app/store/monaco.actions';

@Component({
  selector: 'e-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.scss']
})
export class PadComponent implements OnInit, OnDestroy {

  subscriptions = [];

  editor;

  preprocessor: string;

  editorOptions = {
    automaticLayout: true,
    codeLens: false,
    scrollbar: {
      horizontalScrollbarSize: 4,
      verticalScrollbarSize: 4
    },
    theme: 'vs-dark',
    language: 'text',
    tabSize: 2
  };

  code: PadCode = {
    src: '',
    status: 'init',
    transformer: 'none'
  };

  constructor(
    private store: Store,
    public dialog: MatDialog
  ) { }

  @Input()
  pad: PadModel = {
    title: '',
    type: 'text',
    conf: {
      visible: false,
      visSwitcher: false,
      row: {
        start: 0,
        end: 0
      },
      column: {
        start: 0,
        end: 0
      }
    },
    editor: {
      options: {}
    },
    options: {
      active: false
    }
  };

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }

  init() {
    // настроим редактор
      this.editorOptions = { ...this.editorOptions, ...this.pad.editor.options };

      // достанем код
      this.store.selectOnce(state => state.codeState)
        .subscribe(res => {
          const item = res.code[this.pad.type];
          if (item && item.status === 'init') {
            this.code = item;
            this.updateCode(item.src);
          }
          this.titlePreprocessor();
        });
  }

  editorInit($event) {
    const MONACO = window['monaco'];
    // console.log($event)
    this.editor = $event;
    // console.log(this.editor.getModel())

    if (this.pad.type === 'js') {
      MONACO.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: MONACO.languages.typescript.ScriptTarget.ES5,
        allowNonTsExtensions: true
      });
    }

    this.store
      .dispatch(new MonacoActions.SetEditor({ editor: this.editor, type: this.pad.type }));

    // Change editor language
    this.store.select(state => state.editorState).subscribe(({ editorPads }) => {
        const editorLang = this.editorOptions.language;
        const editorNewLang = editorPads[this.pad.type].editor.options.language;
        if (editorNewLang !== editorLang) {
          this.editorOptions.language = editorNewLang;
          MONACO.editor.setModelLanguage(this.editor.getModel(), editorNewLang);
          this.titlePreprocessor();
        }
    });
  }

  titlePreprocessor() {
    const preprocessor = this.code && this.code.transformer;
    this.preprocessor = preprocessor === 'none' ? undefined : preprocessor;
  }

  updateCode(src: string) {
    this.store
      .dispatch(new CodeActions.UpdateCode({ src, type: this.pad.type }));
  }

  modelChanged($event) {
    this.updateCode($event);
  }

  openOptionsDialog(): void {
    if (!this.pad.options.active) {
      return;
    }
    const dialogRef = this.dialog.open(OptionsDialogComponent, {
      minWidth: '50vw',
      minHeight: '50vh',
      data: { type: this.pad.type }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.updateCode(this.code.src);
    });
  }

}
