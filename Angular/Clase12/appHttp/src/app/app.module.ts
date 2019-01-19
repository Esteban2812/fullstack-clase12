import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http"
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppInterceptor} from "./app.interceptor"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  //podemos especifiar un 3er parametro que no es mandatorio, nace porque originalmente solo se podia usar otro interceptor.
  providers: [
{
  provide: HTTP_INTERCEPTORS,useClass: AppInterceptor,multi: true
}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
