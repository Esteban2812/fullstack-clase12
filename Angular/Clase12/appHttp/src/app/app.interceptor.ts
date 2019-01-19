import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable

export class AppInterceptor implements HttpInterceptor{
  //en un pipe usamos la interfaz pipe transform

  // en una interfaz es himpel

  // como es similara  a un servicio se puede usar el decorador inject table

  //requiere implemente el metodo intercept

  intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{

    //el 1er param es la peticion la q se va a interceptar
    //como es de diferentes modulos o servicios no se puede especificar que valor va a ser

    //el 2do param lo que hace es enviar la peticion a la dire original
    //donde se va a enviar
    //eso es lo que va a permitir el segundo parametro next

    //los interceptores devuelven observables, porque el servidor va a contestar cuando resuelve, como se algo llega en forma asincrona, ese interceptor va a recibir e enviar ese onservable, no es  tipo nro, acdena, ni josn, ni arreglos, es uno basado en eventos, p.e. si usamos el interceptor para que en cada peticion enviamos un archivo, el servidor va a ir contestando el progresa de carga.

    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

    const requestClone = req.clone({
      headers: req.headers.append("authorization", accessToken)
    })

    return next.handle(requestClone)
  }
}
