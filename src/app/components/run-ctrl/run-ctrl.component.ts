import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EditorActions } from 'src/app/store/editor.actions';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  selector: 'e-run-ctrl',
  templateUrl: './run-ctrl.component.html',
  styleUrls: ['./run-ctrl.component.scss']
})
export class RunCtrlComponent implements OnInit {

  autoRun = false;

  constructor(
    private store: Store,
    private editorService: EditorService,
  ) { }


  ngOnInit(): void {
    this.store.selectOnce(state => state.editorState)
      .subscribe(res => {
        this.autoRun = res.autoRun;
      });
  }

  run() {
    this.editorService.manRun();
  }

  autoRunChange($event) {
    this.store.dispatch(new EditorActions.SetAutoRun($event.checked));
  }

}
