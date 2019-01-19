import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICurso } from './cursos.interface';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }

  listar(): Observable<ICurso[]>{
    //const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

    //el constructor ... , donde cabecera va dentro de un json, las cabaaceeras ya estan establcidas, en la convencion entre los navegaodres.
  /*const headers: HttpHeaders = new HttpHeaders({
    authorization: `bearer ${accessToken}`
  })*/

    return this.http.get<ICurso[]>("http://cursos.tibajodemanda.com/cursos")
  }

  insertar(curso: ICurso): Observable<any> {
    return this.http.post("http://cursos.tibajodemanda.com/cursos", curso)
  }

  actualizar(curso: ICurso): Observable<any> {
    return this.http.put("http://cursos.tibajodemanda.com/cursos/"+curso.idCurso, curso)
  }

  eliminar(idCurso: number){
    return this.http.delete("http://cursos.tibajodemanda.com/cursos/" + idCurso)
  }
}
