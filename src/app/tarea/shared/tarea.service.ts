import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Tarea } from './tarea';
import { Post } from './post';
import { TAREAS } from './mock-tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  tareasCollection: AngularFirestoreCollection<Tarea>;
  tareas: Observable<Tarea[]>;
  readonly path = 'tarea';

  constructor(private afs: AngularFirestore, private http: HttpClient) { 
    let uid = localStorage.getItem('uid');
    this.tareasCollection = this.afs.collection<Tarea>(this.path);
    this.tareas = this.tareasCollection.valueChanges();
  }

  getTareasFb(){
    return this.tareas;
  }

  getTareas(){
    return TAREAS;
  }

  getPost(){
    return this.http.get('http://jsonplaceholder.typicode.com/posts/1/comments');
  }
}
