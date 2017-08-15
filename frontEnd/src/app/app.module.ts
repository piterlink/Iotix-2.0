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
import { AuthGuard } from "app/guards/auth-guard";
import { UsuariosGuard } from "app/guards/usuarios.guard";
import { UsuarioFormularioComponent } from "app/usuarios/usuario-formulario/usuario-formulario.component";

@NgModule({
  declarations: [
    AppComponent,
    MaterializeDirective,
    PaginaInicialComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    
  ],
  providers: [
    AuthService,
    AuthGuard,
    UsuariosGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
