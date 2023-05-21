import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { ProductComponent } from './pages/product/product/product.component';
import { UserComponent } from './pages/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './pages/product/dialog/dialog.component';
import { CartaComponent } from './pages/carta/carta.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    UserComponent,
    DialogComponent,
    CartaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatChipsModule,
    MatListModule,
  ],
  exports: [MatIconModule, MatDialogModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
