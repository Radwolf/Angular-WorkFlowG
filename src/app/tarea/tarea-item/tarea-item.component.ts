import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { Tarea } from '../shared/tarea';
import { TareaService } from '../shared/tarea.service';
import { TareaId } from '../shared/tarea-id';

@Component({
  selector: 'wfg-tarea-item',
  templateUrl: './tarea-item.component.html',
  styles: []
})
export class TareaItemComponent implements OnInit {

  @Input() tarea: TareaId;
  @Output() notify: EventEmitter<Tarea> = new EventEmitter<Tarea>();

  constructor(private tareaService: TareaService) { }

  ngOnInit() {
  }

  onSuccess(){
    console.log(this.tarea);
    const tareaSave: Tarea = {
      codigo: this.tarea.codigo,
      descripcion: this.tarea.descripcion,
      aplicacion: this.tarea.aplicacion,
      tipo: this.tarea.tipo,
      estado: this.tarea.estado,
      fechaAlta: this.tarea.fechaAlta,
      usuario: this.tarea.usuario,
      despliegue: this.tarea.despliegue
    };
    if (this.tarea) {
      this.tareaService.updateTarea(this.tarea.id, tareaSave);
    }else {
      this.tareaService.insertarTarea(tareaSave);
    }
    this.notify.emit(this.tarea);
  }

  onReturn(){
    this.notify.emit(this.tarea);
  }
}
