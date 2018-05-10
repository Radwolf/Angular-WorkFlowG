import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { Tarea } from '../shared/tarea';
import { TareaService } from '../shared/tarea.service';

@Component({
  selector: 'wfg-tarea-list',
  templateUrl: './tarea-list.component.html',
  styles: []
})
export class TareaListComponent implements OnInit, OnChanges {

  tareas: Tarea[];
  @Output() notifyTarea: EventEmitter<Tarea> = new EventEmitter<Tarea>();

  constructor(private tareaService: TareaService) {
    console.log(`Constructor`);
  }

  ngOnInit() {
    console.log(`OnInit`);
    this.tareas = this.tareaService.getTareas();
  }

  ngOnChanges() {
    console.log(`OnChanges`)
  }

  onSelect(tarea: Tarea){
    this.notifyTarea.emit(tarea);
  }

}
