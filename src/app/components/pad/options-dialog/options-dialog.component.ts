import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OptionsDialogData, PadModel } from 'src/app/interface/editor.interface';
import { Store } from '@ngxs/store';
import { Observable, Observer } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

@Component({
  selector: 'e-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.scss']
})
export class OptionsDialogComponent implements OnInit {

  tabs: Observable<PadModel[]>;

  initialTab = 0;

  constructor(
    public dialogRef: MatDialogRef<OptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OptionsDialogData,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.tabs = new Observable((observer: Observer<PadModel[]>) => {
      this.store.selectOnce(state => state.editorState)
        .subscribe(({ editorPads }) => {
          let tabs = [];
          for (const key in editorPads) {
            if (editorPads.hasOwnProperty(key) &&
              editorPads[key].options && editorPads[key].options.active) {
              tabs.push(editorPads[key]);
            }
          }
          tabs = tabs.map((item, i) => {
            if (item.type === this.data.type) {
              this.initialTab = i; // set active tab on init
            }
            return item;
          });
          observer.next(tabs);
        });
    }).pipe(
      // only once fix
      publishReplay(1),
      refCount(),
    );
  }

}
