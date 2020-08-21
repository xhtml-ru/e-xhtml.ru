import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { EditorActions } from 'src/app/store/editor.actions';
import { PadModel } from 'src/app/interface/editor.interface';

@Component({
  selector: 'e-pad-toggler',
  templateUrl: './pad-toggler.component.html',
  styleUrls: ['./pad-toggler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PadTogglerComponent implements OnInit, OnDestroy {

  subscriptions = [];
  codes;

  constructor(
    private store: Store,
  ) { }

  @Input()
  padsArr: PadModel[];

  ngOnInit(): void {
    const codesubs = this.store.select(state => state.codeState)
      .subscribe(res => {
        this.codes = res.code;
      });
    this.subscriptions.push(codesubs);
  }

  ngOnDestroy(): void {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }


  togglePad(pad: PadModel) {
    this.store.dispatch(new EditorActions.TogglePad(pad.title.toLowerCase()));
  }

  isVisiblePad(pad: PadModel) {
    return pad.conf.visible;
  }
  isCode(pad: PadModel) {
    return this.codes[pad.type] && this.codes[pad.type].src ? true : false;
  }

}
