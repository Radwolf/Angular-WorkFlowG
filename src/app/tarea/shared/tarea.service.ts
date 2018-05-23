import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tarea } from './tarea';
import { TAREAS } from './mock-tarea';
import { TareaId } from './tarea-id';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private http: HttpClient) {
  }

  getTareasHttp() {
    return this.http.get('http://localhost:9000/tareas');
  }

  getTareas() {
    return TAREAS;
  }

  getTareaHttp(id: string) {
    return this.http.get(`http://localhost:9000/tarea/${id}`);
  }

  insertarTareaHttp(tarea: Tarea) {
    return this.http.post(`http://localhost:9000/tarea`, tarea);
  }

  updateTareaHttp(id: string, tarea: Tarea) {
    return this.http.put(`http://localhost:9000/tarea/${id}`, tarea);
  }

}
