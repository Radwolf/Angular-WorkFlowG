import { Component, OnInit, OnChanges, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Tarea } from '../shared/tarea';
import { TareaService } from '../shared/tarea.service';
import { TareaId } from '../shared/tarea-id';
import { Router } from '@angular/router';

@Component({
  selector: 'wfg-tarea-list',
  templateUrl: './tarea-list.component.html',
  styles: []
})
export class TareaListComponent implements OnInit, OnChanges, OnDestroy {

  obTareaService: any;
  tareas: TareaId[];
  @Output() notifyTarea: EventEmitter<Tarea> = new EventEmitter<Tarea>();

  constructor(private tareaService: TareaService, private router: Router) {
    console.log(`Constructor`);
  }

  ngOnInit() {
    console.log(`OnInit`);
    //this.tareas = this.tareaService.getTareas();
    this.obTareaService = this.tareaService.getTareasFb().subscribe(tareas => {
        this.tareas = tareas;
    });
    this.tareaService.getPost().subscribe(posts => {
      console.log(posts);
    });
  }

  ngOnChanges() {
    console.log(`OnChanges`);
  }

  onSelect(tarea: Tarea){
    this.notifyTarea.emit(tarea);
  }

  print(tarea: TareaId){
    console.log(tarea.id);
    this.router.navigate([`tarea/print/${tarea.id}`]);
  }

  ngOnDestroy(){
    console.log(`OnDestroy`);
    //this.obTareaService.unsubscribe();
  }
}
