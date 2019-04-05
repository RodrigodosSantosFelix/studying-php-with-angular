/*
* O componente de alerta envia mensagens de alerta ao modelo sempre que uma
* mensagem é recebida do serviço de alerta. Isso é feito assinando o método
* getMessage () do serviço de alerta, que retorna um Observable.
*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '@app/_services';

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  mensagem: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(mensagem => {
      this.mensagem = mensagem;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
