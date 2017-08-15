import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/login/auth.service";
import { UsuarioDto } from "app/login/usuarioDto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioDto = new UsuarioDto();

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
  }
  autenticar() {
    this.authService.atenticar(this.usuario);
  }

}
