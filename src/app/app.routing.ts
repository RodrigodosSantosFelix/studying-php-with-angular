/*
* O arquivo app.routing define as rotas do aplicativo, cada rota contém um
* caminho e um componente associado. A rota residencial é protegida passando o
* AuthGuard para a propriedade canActivate da rota.
*/

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './registro';
import { AuthGuard } from './guards';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },

  // caso contrário, redirecione para home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

//export const routing = RouterModule.forRoot(appRoutes);
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export const routerComponents = [HomeComponent, LoginComponent, RegisterComponent];
