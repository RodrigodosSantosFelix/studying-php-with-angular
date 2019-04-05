/*
* O arquivo app.routing define as rotas do aplicativo, cada rota contém um
* caminho e um componente associado. A rota residencial é protegida passando o
* AuthGuard para a propriedade canActivate da rota.
*/

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './registro';
import { AuthGuard } from './guards';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },

  // caso contrário, redirecione para home
  { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);
