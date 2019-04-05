/*
* O protetor de autenticação é usado para impedir que usuários não autenticados
* acessem rotas restritas; neste exemplo, ele é usado em app.routing.ts
* para proteger a rota da página inicial.
*
* Embora tecnicamente seja possível ignorar essa verificação de autenticação do
* lado do cliente adicionando manualmente um objeto 'currentUser' ao
* armazenamento local usando ferramentas de desenvolvimento do navegador, isso
* só daria acesso às rotas / componentes do lado do cliente, não daria acesso a
* nenhum dados seguros reais da API do servidor porque um token de autenticação
*válido (JWT) é necessário para isso.
*/

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('usuarioAtual')) {
      return true; //logado, retorne verdadeiro
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false; //Não logado, retorna para a tela de Login com a URL de retorno
  }
}
