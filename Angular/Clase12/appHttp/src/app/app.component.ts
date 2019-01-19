import { Component } from '@angular/core';
import { CursosService } from './cursos.service';
import { ICurso } from './cursos.interface';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { Subject } from "rxjs"
import { startWith, switchMap } from "rxjs/operators"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cursos: ICurso[] = []
  grupo: FormGroup
  observador: Subject<any> = new Subject<any>()

  constructor(private cursosService: CursosService) { }

  ngOnInit() {
    this.grupo = new FormGroup({
      titulo: new FormControl(null, Validators.required)
    })

    this.observador
      .pipe(
        startWith({}),
        switchMap(
          resp => this.cursosService.listar()
        )
      )
      .subscribe(
        (data: ICurso[]) => this.cursos = data.sort((a,b) => a.idCurso>b.idCurso ? -1 : 1 )
      )

    /* this.observador.next() */


  }

  insertar() {
    const curso: ICurso = this.grupo.getRawValue()
    this.cursosService.insertar(curso)
      .subscribe(
        data => {
          console.log("registro insertado")
          this.observador.next(data)
          this.grupo.reset()
        },
        error => console.log(error)
      )
  }

  eliminar(idCurso:Number){
    console.log(idCurso)
    const curso: ICurso = this.grupo.getRawValue()
    this.cursosService.eliminar(idCurso)
    .subscribe(
      data => {
        console.log("registro eliminado")
        this.observador.next(data)
        //this.grupo.reset()
      },
      error => console.log(error)
    )
  }

  refrescar(){
    this.observador.next()
  }

}
