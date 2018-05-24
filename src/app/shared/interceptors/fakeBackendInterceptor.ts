import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import { TareaId } from '../../tarea/shared/tarea-id';
 
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
 
    constructor() { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let tareas: TareaId[] = JSON.parse(localStorage.getItem('tareas')) || [];
 
        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {
 
            // get tareas
            if (request.url.endsWith('/api/tareas') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                //if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return Observable.of(new HttpResponse({ status: 200, body: tareas }));
                //} else {
                    // return 401 not authorised if token is null or invalid
                //    return Observable.throw('Unauthorised');
                //}
            }
 
            // get user by id
            if (request.url.match(/\/api\/tareas\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                //if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = urlParts[urlParts.length - 1];
                    let matchedTareas = tareas.filter(tarea => { return tarea.id === id; });
                    let tarea = matchedTareas.length ? matchedTareas[0] : null;
 
                    return Observable.of(new HttpResponse({ status: 200, body: tarea }));
                /*} else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }*/
            }
 
            // create tarea
            if (request.url.endsWith('/api/tareas') && request.method === 'POST') {
                // get new tarea object from post body
                let newTarea = request.body;
                let autoId = parseInt(localStorage.getItem('autoId')) | 0;

                // validation
                let duplicateTarea = tareas.filter(tarea => { return tarea.id === newTarea.id; }).length;
                if (duplicateTarea) {
                    return Observable.throw('La Tarea "' + newTarea.codigo + '" ya existe');
                }
 
                // save new user
                let newId =  (autoId + 1) + "";
                localStorage.setItem('autoId', newId);
                newTarea.id = newId;
                
                tareas.push(newTarea);
                localStorage.setItem('tareas', JSON.stringify(tareas));
 
                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }
 
            // update tarea
            if (request.url.match(/\/api\/tareas\/\d+$/) && request.method === 'PUT') {
                // get new tarea object from post body
                let updateTarea = request.body;
                let urlParts = request.url.split('/');
                var id = urlParts[urlParts.length - 1];
                tareas.forEach((tarea: TareaId) => {
                    if(tarea.id  === id){
                        tarea.codigo = updateTarea.codigo;
                        tarea.descripcion = updateTarea.descripcion;
                        tarea.aplicacion = updateTarea.aplicacion;
                        tarea.despliegue = updateTarea.despliegue;
                        tarea.estado = updateTarea.estado;
                        tarea.fechaAlta = updateTarea.fechaAlta;
                        tarea.tipo = updateTarea.tipo;
                        tarea.usuario = updateTarea.usuario;
                    }
                }, id);

                localStorage.setItem('tareas', JSON.stringify(tareas));
    
                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }

            // delete user
            if (request.url.match(/\/api\/tareas\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return tarea if valid, this security is implemented server side in a real application
                //if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find tarea by id in tareas array
                    let urlParts = request.url.split('/');
                    let id = urlParts[urlParts.length - 1];
                    for (let i = 0; i < tareas.length; i++) {
                        let tarea = tareas[i];
                        if (tarea.id === id) {
                            // delete tarea
                            tareas.splice(i, 1);
                            localStorage.setItem('tareas', JSON.stringify(tareas));
                            break;
                        }
                    }
 
                    // respond 200 OK
                    return Observable.of(new HttpResponse({ status: 200, body: tareas }));
                /*} else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }*/
            }
 
            // pass through any requests not handled above
            return next.handle(request);
             
        })
 
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .materialize()
        .delay(500)
        .dematerialize();
    }
}
 
export let FakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};