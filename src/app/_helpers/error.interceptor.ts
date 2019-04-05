/*
* O Interceptador de Erros intercepta as respostas http da API para verificar se
* houve algum erro. Se houver uma resposta 401 Unauthorized, o usuário será
* automaticamente desconectado do aplicativo, todos os outros erros serão
* lançados novamente para serem capturados pelo serviço de chamada, de modo que
* um alerta possa ser exibido para o usuário.
*
* Ele é implementado usando a classe HttpInterceptor que foi introduzida no
* Angular 4.3 como parte do novo HttpClientModule. Ao estender a classe
* HttpInterceptor, você pode criar um interceptador personalizado para capturar
* todas as respostas de erro do servidor em um único local.

* Http interceptors são adicionados ao pipeline de solicitação na seção
* providers do arquivo app.module.ts .
*/

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(erro => {
      if (erro.status === 401) {
        // auto logout caso o response retornar 401
        this.authenticationService.logout();
        location.reload(true);
      }

      const cErro = erro.cErro.mensagem || erro.statusText;
      return throwError(cErro);
    }))
  }
}
