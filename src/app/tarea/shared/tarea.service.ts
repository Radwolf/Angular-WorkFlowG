import { Injectable } from '@angular/core';
import { Tarea } from './tarea';
import { TAREAS } from './mock-tarea';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor() { }

  getTareas(){
    return TAREAS;
  }

  getOTareas(): Observable<Tarea[]>{
    return Observable.create(TAREAS);
  }
}
