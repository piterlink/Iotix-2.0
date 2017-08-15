import { NgModule } from "@angular/core";

import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { PaginaInicialComponent } from "app/pagina-inicial/pagina-inicial.component";
import { UsuariosComponent } from "app/usuarios/usuarios.component";
import { LoginComponent } from "app/login/login.component";
import { UsuarioDetalheComponent } from "app/usuarios/usuario-detalhe/usuario-detalhe.component";
import { AuthGuard } from "app/guards/auth-guard";
import { UsuariosGuard } from "app/guards/usuarios.guard";


const appRoutes: Routes = [
    {
        path: "usuarios",
        loadChildren: "app/usuarios/usuarios.module#UsuariosModule",
        canActivate: [AuthGuard]
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "",
        component: PaginaInicialComponent,
        canActivate: [AuthGuard]
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}