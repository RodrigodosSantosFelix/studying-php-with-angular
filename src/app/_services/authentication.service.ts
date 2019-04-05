/*
* O serviço de autenticação é usado para efetuar login e logout do aplicativo,
* para efetuar login ele envia as credenciais dos usuários para a API e verifica
* a resposta para um token JWT; se houver, significa que a autenticação foi
* bem-sucedida, portanto os detalhes do usuário incluindo o token são
* adicionados para armazenamento local.
*
* Os detalhes do usuário logado são armazenados no armazenamento local para que
* o usuário permaneça logado se atualizar o navegador e também entre as sessões
* do navegador até que elas efetuem o logout. Se você não quiser que o usuário
* permaneça logado entre atualizações ou sessões, o comportamento pode ser
* facilmente alterado, armazenando detalhes do usuário em algum lugar menos
* persistente, como armazenamento de sessão ou em uma propriedade do serviço de
* autenticação.
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(nome: string, senha: string) {
    return this.http.post<any>(`${config.apiUrl}/usuarios/autenticado`, { nome: nome, senha: senha })
      .pipe(map(usuario => {
        // login bem-sucedido se houver um token jwt na resposta
        if (usuario && usuario.token) {
          // armazenar detalhes do usuário e token jwt no armazenamento local para
          // manter o usuário logado entre as atualizações da página.
          localStorage.setItem('usuarioAtual', JSON.stringify(usuario));
        }
        return usuario;
      }));
  }
  logout() {
    // remove usuário do armazenamento local para fazer logout do usuário
    localStorage.removeItem('usuarioAtual');
  }
}
