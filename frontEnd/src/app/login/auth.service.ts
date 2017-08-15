import { Injectable, EventEmitter } from '@angular/core';
import { UsuarioDto } from "app/login/usuarioDto";
import { Router } from "@angular/router";


@Injectable()
export class AuthService {
  private usuarioAutenticar: boolean = false;
  public mostrarMenuEmmiter = new EventEmitter<boolean>();
  constructor(private router: Router) { }

  atenticar(usuario: UsuarioDto) {
    if (usuario.nome === 'piterlink' && usuario.senha === '123') {
      this.usuarioAutenticar = true;

      this.mostrarMenuEmmiter.emit(true);

      this.router.navigate(['/']);


    } else {
      this.usuarioAutenticar = false;

      this.mostrarMenuEmmiter.emit(false);
    }
  }

}
