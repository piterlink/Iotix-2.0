import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common/";
import { FormsModule } from "@angular/forms";


import { UsuariosComponent } from './usuarios.component';
import { UsuarioDetalheComponent } from "app/usuarios/usuario-detalhe/usuario-detalhe.component";
import { UsuariosService } from "app/usuarios/usuarios.service";
import { UsuariosRoutingModule } from "app/usuarios/usuarios.routing.module";
import { UsuarioFormularioComponent } from "app/usuarios/usuario-formulario/usuario-formulario.component";

@NgModule({
    imports: [
        CommonModule,
        UsuariosRoutingModule,
        FormsModule
       
    ],
    exports: [],
    declarations: [
        UsuariosComponent,
        UsuarioDetalheComponent,
        UsuarioFormularioComponent
    ],
    providers: [UsuariosService],
})
export class UsuariosModule { }
