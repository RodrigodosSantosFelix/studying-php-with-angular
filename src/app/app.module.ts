/*
* O App.Module define o módulo raiz do aplicativo junto com os
* metadados sobre o módulo.
*
* Este é o lugar onde o provedor de back-end falso é adicionado ao aplicativo,
* para mudar para um back-end real basta remover os provedores localizados
* abaixo do comentário // providers used to create fake backend.
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FakeBackendProvider } from './helpers'; // Usa para crear o backend falso
import { Routing } from './app.routing';
import { AlertComponent } from './directives';
import { AuthGuard } from './guards';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { AlertService, AuthenticationService, UserService } from './services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './registro';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider usado para crear o backend falso
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
