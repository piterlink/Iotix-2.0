import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UsuarioFormularioComponent } from "app/usuarios/usuario-formulario/usuario-formulario.component";

@Injectable()
export class UsuariosDeactivateGuard implements CanDeactivate<UsuarioFormularioComponent> {
    canDeactivate(
        component: UsuarioFormularioComponent,
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        console.log('UsuariosDeactivateGuard');
        return true;
    }
}