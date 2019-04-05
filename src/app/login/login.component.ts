/*
* O componente de login usa o serviço de autenticação para efetuar login e
* logout do aplicativo. Ele automaticamente desconecta o usuário quando ele é
* inicializado (ngOnInit) para que a página de login também possa ser usada
* para efetuar logout.
*
* O loginForm: FormGroupobjeto define os controles e validadores de formulários
* e é usado para acessar os dados inseridos no formulário. O FormGroup faz parte
*  do módulo de Formulários Reativos Angulares e está vinculado ao modelo de
* login acima com a [formGroup]="loginForm"diretiva.
*/

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@app/_services';

@Component({ templatUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required]
    });

    // reset o status do login
    this.authenticationService.logout();

    // obter o URL de retorno dos parâmetros da rota ou usar como padrão "/"
    this.returnUrl = thid.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // getter para facilitar o acesso aos campos de formulário
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // pare aqui se o formulário for inválido
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.nome.value, this.f.senha.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        erro => {
          this.alertService.erro(erro);
          this.loading = false;
        }
      );
  }
}
