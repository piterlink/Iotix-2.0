import { NgModule } from "@angular/core";

import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { PaginaInicialComponent } from "app/pagina-inicial/pagina-inicial.component";
import { UsuariosComponent } from "app/usuarios/usuarios.component";
import { LoginComponent } from "app/login/login.component";
import { UsuarioDetalheComponent } from "app/usuarios/usuario-detalhe/usuario-detalhe.component";
import { UsuarioFormularioComponent } from "app/usuarios/usuario-formulario/usuario-formulario.component";


const UsuariosRoutes: Routes = [
    {
        path: "", component: UsuariosComponent, children: [
            { path: "novo", component: UsuarioFormularioComponent },
            { path: ":id", component: UsuarioDetalheComponent },
            { path: ":id/editar", component: UsuarioFormularioComponent },
        ]
    },

]

@NgModule({
    imports: [RouterModule.forChild(UsuariosRoutes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule {

}