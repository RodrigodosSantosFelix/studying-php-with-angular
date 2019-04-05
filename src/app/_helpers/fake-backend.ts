/*
* O provedor backend falso permite que o exemplo seja executado sem
*  backend / backendless, ele usa armazenamento local HTML5 para armazenar dados
* de usuários registrados e fornece implementações falsas para autenticação e
* métodos CRUD, estes seriam manipulados por uma API real e banco de dados em
* um aplicativo de produção.

* Ele é implementado usando a classe HttpInterceptor que foi introduzida no
* Angular 4.3 como parte do novo HttpClientModule. Ao estender a classe
* HttpInterceptor, você pode criar um interceptor personalizado para modificar
* solicitações http antes que elas sejam enviadas ao servidor. Nesse caso, o
* FakeBackendInterceptor intercepta certas solicitações com base em sua URL e
* fornece uma resposta falsa em vez de ir para o servidor.
*/

import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // array no armazenamento local para usuários registrados
    let usuarios: any[] = JSON.parse(localStorage.getItem('usuarios')) || [];
    // Enrole em atraso observável para simular a chamada api do servidor
    return of(null).pipe(mergeMap(() => {
      //autenticar
      if (request.url.endsWith('/usuarios/autenticado') && request.method === 'POST') {
        // descobrir se algum usuário corresponde a credenciais de login.
        // let é utilizado para declarar variáveis com escopo de bloco.
        let filteredUsers = usuarios.filter(usuario => {
          return usuario.nome === request.body.nome && usuario.senha === request.body.senha;
        });

        if (filteredUsers.length) {
          // se os detalhes de login forem válidos,
          // retorne 200 OK com detalhes do usuário e token jwt falso
          let usuario = filteredUsers[0];
          let body = {
            id: usuario.id,
            nome: usuario.nome,
            //            firstName: user.firstName,
            //            lastName: user.lastName,
            token: 'fake-jwt-token'
          };

          return of(new HttpResponse({ status: 200, body: body }));
        } else {
          // Retorna 400 pedido ruim
          return throwError({ erro: { mensagem: 'Nome de usuário ou senha esta incorreta' } });
        }
      }

      // obter usuários
      if (request.url.endsWith('/usuarios') && request.method === 'GET') {
        // verifique se há um token de autenticação falso no cabeçalho e
        // retorne aos usuários se for válido, essa segurança será
        // implementada no lado do servidor em um aplicativo real
        if (request.headers.get('Autorizacao') === 'Bearer fake-jwt-token') {
          return of(new HttpResponse({ status: 200, body: usuarios }));
        } else {
          // retorna 401 não autorizado se o token for nulo ou inválido
          return throwError({ status: 401, erro: { mensagem: 'Não autorizado' } });
        }
      }

      // pega usuario pelo ID
      if (request.url.match(/\/usuarios\/\d+$/) && request.method === 'GET') {
        // verifique se há um token de autenticação falso no cabeçalho e
        // retorne o usuário se for válido, essa segurança será implementada no
        // lado do servidor em um aplicativo real
        if (request.headers.get('Autorizacao') === 'Bearer fake-jwt-token') {
          // encontra usuário por id na matriz de usuários
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          let matchedUsers = usuarios.filter(usuario => { return usuario.id === id; });
          let usuario = matchedUsers.length ? matchedUsers[0] : null;

          return of(new HttpResponse({ status: 200, body: usuario }));
        } else {
          // retorna 401 não autorizado se o token for nulo ou inválido
          return throwError({ status: 401, erro: { mensagem: 'Não autorizado' } });
        }
      }

      // registrar usuário
      if (request.url.endsWith('/usuarios/registro') && request.method === 'POST') {
        // pega um novo objeto de usuário do corpo do post
        let novoUsuario = request.body;

        // validação
        let usuarioDuplicado = usuarios.filter(usuario => { return usuario.nome === novoUsuario.nome; }).length;
        if (usuarioDuplicado) {
          return throwError({ erro: { mensagem: 'Nome "' + novoUsuario.nome + '" já existe' } });
        }

        // Salvar o novo usuário
        novoUsuario.id = usuarios.length + 1;
        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // responde 200 OK
        return of(new HttpResponse({ status: 200 }));
      }

      // deletar usuario
      if (request.url.match(/\/usuarios\/\d+$/) && request.method === 'DELETE') {
        // verifique se há um token de autenticação falso no cabeçalho e retorne
        // o usuário se for válido, essa segurança será implementada no lado do
        // servidor em um aplicativo real.
        if (request.headers.get('Autorizacao') === 'Bearer fake-jwt-token') {
          // encontra usuário por id na matriz de usuários
          let urlParts = request.url.split('/');
          let id = parseInt(urlParts[urlParts.length - 1]);
          for (let i = 0; i < usuarios.length; i++) {
            let usuario = usuarios[i];
            if (usuario.id === id) {
              // deleta usuario
              usuarios.splice(i, 1);
              localStorage.setItem('usuarios', JSON.stringify(usuarios));
              break;
            }
          }

          // responde 200 OK
          return of(new HttpResponse({ status: 200 }));
        } else {
          // retorna 401 não autorizado se o token for nulo ou inválido
          return throwError({ status: 401, erro: { mensagem: 'Não autorizado' } });
        }
      }

      // passar por quaisquer solicitações não tratadas acima
      return next.handle(request);

    }))

      // chama o materialize e dematerialize para garantir o atraso, mesmo que um erro seja lançado (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  // usar backend falso no lugar do serviço Http para desenvolvimento sem back-end
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
