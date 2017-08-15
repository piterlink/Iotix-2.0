import { Injectable, EventEmitter } from '@angular/core';
import { UsuarioDto } from "app/login/usuarioDto";
import { Router } from "@angular/router";


@Injectable()
export class AuthService {
  private usuarioAutenticado: boolean = false;
  public mostrarMenuEmmiter = new EventEmitter<boolean>();
  constructor(private router: Router) { }

  atenticar(usuario: UsuarioDto) {
    if (usuario.nome === 'piterlink' && usuario.senha === '123') {
      this.usuarioAutenticado = true;

      this.mostrarMenuEmmiter.emit(true);

      this.router.navigate(['/']);


    } else {
      this.usuarioAutenticado = false;

      this.mostrarMenuEmmiter.emit(false);
    }
  }

  autenticado(){
    return this.usuarioAutenticado;
  }

}
