import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute } from "@angular/router";
import { UsuariosService } from "app/usuarios/usuarios.service";
import { UsuarioDto } from "app/usuarios/usuario-formulario/UsuarioDto";

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.css']
})
export class UsuarioFormularioComponent implements OnInit, OnDestroy {
  private id: number;
  private inscricao: Subscription;
  private usuario: any;
  constructor(private route: ActivatedRoute, private usuariosService: UsuariosService) { }

  ngOnInit() {    
    this.inscricao = this.route.params.subscribe((params: any) => {
      let id = params['id'];
      this.usuario = this.usuariosService.getById(id);
      if (!this.usuario) {
        this.usuario = {}
      }
    })
    console.log(this.usuario);
  }
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
