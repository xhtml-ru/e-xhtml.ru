import { Component, OnInit, Input } from '@angular/core';
import { PadModel } from 'src/app/interface/editor.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { EditorActions } from 'src/app/store/editor.actions';
import { CodeActions } from 'src/app/store/code.actions';

@Component({
  selector: 'e-preprocessor',
  templateUrl: './preprocessor.component.html',
  styleUrls: ['./preprocessor.component.scss']
})
export class PreprocessorComponent implements OnInit {

  transformerForm: FormGroup = new FormGroup({
    transformer: new FormControl('')
  });

  constructor(
    private store: Store,
  ) { }

  @Input()
  pad: PadModel;

  ngOnInit(): void {
    this.store.selectOnce(state => state.codeState)
      .subscribe(res => {
        if (this.pad) {
          const item = res.code[this.pad.type];
          this.transformerForm.patchValue({ transformer: item.transformer });
        }
      });
  }

  changeTransformer(){
    let data = {
      type: this.pad.type
    }
    const val = this.transformerForm.value;
    data = {...data, ...val}
    this.store.dispatch(new CodeActions.UpdateTransformer(data));
  }

}
