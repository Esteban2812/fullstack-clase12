import { Component } from '@angular/core';
import { Subject, merge, interval, of } from 'rxjs';
import { switchMap, startWith} from "rxjs/operators"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  obsPagina: Subject<any> = new Subject<any>()
  obsOrdenamiento: Subject<any> = new Subject<any>()
  obsBuscar: Subject<any> = new Subject<any>()

  pagina: number = 1
  ordenamiento: string = "nombre"
  textoABuscar: string = ""
  resultados: Array<any> = []

  cambioPagina() {
    //console.log("página", this.pagina)
    this.obsPagina.next()
  }

  cambioOrdenamiento(){
    //console.log("ordenamiento", this.ordenamiento)
    this.obsOrdenamiento.next()
  }

  cambioBuscador() {
    this.obsBuscar.next()
  }

  ngOnInit(){
    merge(this.obsPagina, this.obsOrdenamiento, this.obsBuscar)
      .pipe(
        startWith({}),
        switchMap(()=> {
          const personas = [
            {nombre: "Sergio", sexo: "Hombre"},
            {nombre: "Kelly", sexo: "Mujer"},
            {nombre: "Marjorie", sexo: "Mujer"},
            {nombre: "Javier", sexo: "Hombre"},
            {nombre: "Clarisa", sexo: "Mujer"},
            {nombre: "Evelyn", sexo: "Mujer"},
            {nombre: "Alejandro", sexo: "Hombre"},
            {nombre: "Anthony", sexo: "Hombre"},
            {nombre: "Brenda", sexo: "Mujer"}
          ]

          return of(
            personas
              .filter(persona => {
                if(this.textoABuscar.trim()=="") return true

                return persona.nombre.toLowerCase().indexOf(this.textoABuscar.toLowerCase()) > -1 ? true : false
              })
              .sort((a, b) =>  a[this.ordenamiento]>b[this.ordenamiento] ? 1 : -1)
              .slice((this.pagina-1)*4, (this.pagina-1)*4 + 4)
          )

        })
      )
      .subscribe(
        data => this.resultados = data
      )

      //this.obsBuscar.next()
  }
}
