import { Component, OnInit } from '@angular/core';
import { Tarea } from '../shared/tarea';

@Component({
  selector: 'wfg-tarea-list',
  templateUrl: './tarea-list.component.html',
  styles: []
})
export class TareaListComponent implements OnInit {

  tareas: Tarea[] = [
    {codigo: "TAR1", descripcion: "Creación componente tarea-list", aplicacion: "WorkFlowG", tipo: "Feature", estado: "Desarrollo", fechaAlta: "2018/05/10", usuario: "Rul", despliegue: "1.0"},
    {codigo: "TAR2", descripcion: "Creación componente tarea-item", aplicacion: "WorkFlowG", tipo: "Feature", estado: "Desarrollo", fechaAlta: "2018/05/10", usuario: "Rul", despliegue: "1.0"}
  ];

  constructor() { }

  ngOnInit() {
  }

}
