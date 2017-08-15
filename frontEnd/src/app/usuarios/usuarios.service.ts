import { Injectable } from '@angular/core';

@Injectable()
export class UsuariosService {

  private usuarios: any[] = [
    { id: 1, nome: 'Piter Raphael Oliveira e Silva', email: 'pitelink@gmail.com' },
    { id: 2, nome: 'Thiago José Oliveira e Silva', email: 'thiagoxdg@gmail.com' },
    { id: 3, nome: 'Gabriel Lucas Bispo da Rocha', email: 'gabriel.lucas@gmail.com' },
    { id: 4, nome: 'Renato Mendes Peixoto', email: 'renato_mendez@gmail.com' }
  ]

  constructor() { }
  getAll() {
    return this.usuarios;
  }
  getById(id) {
    let usuarios = this.getAll();
    let usuario: any;
    console.log(usuarios);
    usuarios.forEach(item => {
      console.log((item.id == id));
      if (item.id == id)
        usuario = item;
    });
    return usuario
  }
}
