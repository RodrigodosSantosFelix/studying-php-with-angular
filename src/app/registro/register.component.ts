/*
* O componente de registro cria um novo usuário com o serviço de usuário quando
* o formulário de registro é enviado.
*
* O registerForm: FormGroupobjeto define os controles e validadores de
* formulários e é usado para acessar os dados inseridos no formulário.
* O FormGroup faz parte do módulo de Formulários Reativos Angulares e está
* vinculado ao modelo de login com a [formGroup]="registerForm"diretiva.
*/

import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '@app/_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      nome: ['', Validators.required],
      senha: ['', Validators.required, Validators.minlength(6)]
    });
  }

  //getter para facilitar o acesso aos campos de formulário
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // para aqui se o form é inválido
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.sucesso('Registro Concluido', true);
          this.router.navigate(['/login']);
        },
        erro => {
          this.alertService.erro(erro);
          this.loading = false;
        }
      );
  }
}
