import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { ProductComponent } from './pages/product/product/product.component';
import { UserComponent } from './pages/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './pages/product/dialog/dialog.component';
import { CartaComponent } from './pages/carta/carta.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { appRouting } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { SuccesDialogComponent } from './pages/registro/succes-dialog/succes-dialog.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { MatTableModule } from '@angular/material/table';
import { AdminComponent } from './pages/admin/admin.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogProductoComponent } from './pages/admin/dialog-producto/dialog-producto.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    UserComponent,
    DialogComponent,
    CartaComponent,
    NotFoundComponent,
    HomeComponent,
    AboutComponent,
    RegistroComponent,
    LoginComponent,
    SuccesDialogComponent,
    CarritoComponent,
    PerfilComponent,
    PedidoComponent,
    AdminComponent,
    DialogProductoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatListModule,
    AppRoutingModule,
    appRouting,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatBadgeModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
  ],
  exports: [MatIconModule, MatDialogModule, MatButtonModule, MatBadgeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
