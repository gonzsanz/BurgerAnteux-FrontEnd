import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartaComponent } from './pages/carta/carta.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'carta', component: CartaComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegistroComponent, pathMatch: 'full'},
  { path: '**', component: NotFoundComponent },
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot([])],
  exports: [RouterModule],
})
export class AppRoutingModule {}
