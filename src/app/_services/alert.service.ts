/*
* O serviço de alerta permite que qualquer componente no aplicativo exiba
* mensagens de alerta na parte superior da página por meio do componente de
* alerta.
*
* Ele possui métodos para exibir mensagens de sucesso e erro e um método
* getMessage () que retorna um Observable que é usado pelo componente de alerta
* para assinar notificações sempre que uma mensagem deve ser exibida.
*/


import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // mensagem de alerta clara na mudança de rota
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          //manter apenas para uma única mudança de local
          this.keepAfterNavigationChange = false;
        }
        else {
          // limpa o alerta
          this.subject.next();
        }
      }
    });
  }

  sucesso(mensagem: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'sucesso', text: mensagem });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
