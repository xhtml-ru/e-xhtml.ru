import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { PadModel } from 'src/app/interface/editor.interface';

@Component({
  selector: 'e-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  padsArr: PadModel[];
  subscriptions = [];

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    const padButtons = this.store.select(state => state.editorState)
      .pipe().subscribe(res => {
        this.padsArr = [];
        for (const key in res.editorPads) {
          if (res.editorPads.hasOwnProperty(key) && res.editorPads[key].conf.visSwitcher) {
            this.padsArr.push(res.editorPads[key]);
          }
        }
      });
    // сохраняем подписку для отписки
    this.subscriptions.push(padButtons);
  }


  ngOnDestroy() {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }

}
