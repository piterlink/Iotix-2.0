import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Rx";

import { UsuariosService } from "app/usuarios/usuarios.service";

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  styleUrls: ['./usuario-detalhe.component.css']
})
export class UsuarioDetalheComponent implements OnInit, OnDestroy {
  private id: number;
  private inscricao: Subscription;
  private usuario: any;
  constructor(private route: ActivatedRoute, private router: Router, private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe((params: any) => {
      let id = params['id'];
      this.usuario = this.usuariosService.getById(id);
    })
  }
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  private editarContato() {
    this.router.navigate(['/usuarios', this.usuario.id, 'editar'])
  }

}
