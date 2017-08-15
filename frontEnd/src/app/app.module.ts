import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterializeModule, MaterializeDirective } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "app/app.routing.module";

import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from "app/login/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    LoginComponent,
    MaterializeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
