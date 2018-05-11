import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Tarea } from '../shared/tarea';

@Component({
  selector: 'wfg-tarea-item',
  templateUrl: './tarea-item.component.html',
  styles: []
})
export class TareaItemComponent implements OnInit {

  @Input() tarea: Tarea;
  @Output() notify: EventEmitter<Tarea> = new EventEmitter<Tarea>();

  constructor() { }

  ngOnInit() {
  }

  onSuccess(){
    this.notify.emit(this.tarea);
  }

  onReturn(){
    this.notify.emit(this.tarea);
  }
}
