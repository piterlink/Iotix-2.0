import { Injectable } from "@angular/core";
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { AuthService } from "app/login/auth.service";

@Injectable()
export class UsuariosGuard implements CanActivateChild {

    constructor(private authService: AuthService, private router: Router) { }

    canActivateChild(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        // if (state.url.includes('editar')) {
        //     alert('Não pode Entrar');
        //     return false;
        // }

        if (this.authService.autenticado())
            return true;

        this.router.navigate(['/login'])

        return false;
    }
}