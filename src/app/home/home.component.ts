/*
* O componente inicial obtém o usuário atual do armazenamento local e todos os
* usuários do serviço do usuário e os torna disponíveis para o modelo.
*/

import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Usuario } from '@app/_models';
import { UserService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  usuarioAtual: Usuario;
  usuarios: Usuario[] = [];

  constructor(private userService: UserService) {
    this.usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers()
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }
}
