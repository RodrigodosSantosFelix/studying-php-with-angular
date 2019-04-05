/*
* O serviço do usuário contém um conjunto padrão de métodos CRUD para gerenciar
* usuários, ele age como a interface entre o aplicativo Angular e a API de
* back-end.
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '@app/_models';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Usuario[]>(`${config.apiUrl}/usuarios`);
  }

  getById(id: number) {
    return this.http.get(`${config.apiUrl}/usuarios/` + id);
  }

  registrar(usuario: Usuario) {
    return this.http.post(`${config.apiUrl}/usuarios/registrar`, usuario);
  }

  atualizar(usuario: Usuario) {
    return this.http.put(`${config.apiUrl}/usuarios/` + usuario.id, usuario);
  }
  deletar(id: number) {
    return this.http.delete(`${config.apiUrl}/usuarios/` + id);
  }
}
