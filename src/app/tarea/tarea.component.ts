import { Component, OnInit } from '@angular/core';
import { Tarea } from './shared/tarea';
import { TareaId } from './shared/tarea-id';

@Component({
  selector: 'wfg-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  tarea: Tarea;
  tareas: TareaId[];

  constructor() { }

  ngOnInit() {
  }

  onSelectTarea(tarea: Tarea){
    this.tarea = tarea;
  }

  cargarTareas(tareas: TareaId[]){
    this.tareas = tareas;
    this.tarea = null;
  }
}
