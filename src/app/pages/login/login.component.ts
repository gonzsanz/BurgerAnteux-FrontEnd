import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SuccesDialogComponent } from '../registro/succes-dialog/succes-dialog.component';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  errorMessage = '';
  isIncorrect = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authService.login(email, password).subscribe(
        (res: any) => {
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('password', password);
          this.isIncorrect = false;
          const dialogRef = this.dialog.open(SuccesDialogComponent, {
            disableClose: true,
            data: { message: 'Bienvenido' },
          });

          timer(2000).subscribe(() => {
            dialogRef.close();
            if (this.cartService.getItems().length > 0) {
              this.router.navigateByUrl('/pago').then(() => {
                window.location.reload();
              });
            } else {
              this.router.navigateByUrl('/carta').then(() => {
                window.location.reload();
              });
            }
          });
        },
        (err) => {
          this.isIncorrect = true;
          this.errorMessage = 'El usuario o la contraseña son incorrectos';
        }
      );
    }
  }
}
