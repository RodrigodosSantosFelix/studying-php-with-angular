/*
* O JWT Interceptor intercepta solicitações http do aplicativo para incluir um
* token de autenticação JWT no cabeçalho de Autorização se o usuário estiver
* conectado.
*
* Ele é implementado usando a classe HttpInterceptor que foi introduzida no
* Angular 4.3 como parte do novo HttpClientModule. Ao estender a classe
* HttpInterceptor, você pode criar um interceptor personalizado para modificar
*solicitações http antes que elas sejam enviadas ao servidor.
*
* Http interceptors são adicionados ao pipeline de solicitação na seção
*providers do arquivo app.module.ts .
*/

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //adiciona cabeçalho de autorização com token jwt, se disponível
    let usuarioAtual = JSON.parse(localStorage.getItem('usuarioAtual'));
    if (usuarioAtual && usuarioAtual.token) {
      request = request.clone({
        setHeaders: {
          Autorizacao: 'Bearer ${usuarioAtual.token}'
        }
      });
    }
    return next.handle(request);
  }
}
