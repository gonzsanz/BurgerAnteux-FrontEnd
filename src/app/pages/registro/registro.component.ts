import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SuccesDialogComponent } from './succes-dialog/succes-dialog.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  registerForm!: FormGroup;
  hide = true;
  hide2 = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.registerForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        address: new FormControl('', Validators.required),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]{9}$'),
        ]),
        password: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required),
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    const password = control.get('password')?.value;
    const password2 = control.get('password2')?.value;

    if (password === password2) {
      return null;
    } else {
      control.get('password2')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
  };

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = {
        name: this.registerForm.get('name')?.value,
        lastname: this.registerForm.get('lastname')?.value,
        password: this.registerForm.get('password')?.value,
        email: this.registerForm.get('email')?.value,
        phone: this.registerForm.get('phone')?.value,
        address: this.registerForm.get('address')?.value,
      };

      this.userService.createUser(userData).subscribe(
        (response) => {
          console.log('Usuario agregado', response);

          const dialogRef = this.dialog.open(SuccesDialogComponent, {
            disableClose: true,
            data: { message: 'Usuario registrado correctamente' },
          });

          timer(2000).subscribe(() => {
            dialogRef.close();
            this.router.navigate(['/login']);
          });
        },
        (error) => {
          console.log('Error al agregar usuario', error);

          alert("Usuario ya registrado")
        }
      );
    }
  }
}
