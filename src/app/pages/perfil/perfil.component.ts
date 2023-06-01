import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { SuccesDialogComponent } from '../registro/succes-dialog/succes-dialog.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  userForm!: FormGroup;
  hide = true;
  hide2 = true;
  name: string = '';
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    const email = sessionStorage.getItem('email');

    if (email) {
      this.userService.getUser(email).subscribe((user) => {
        this.name = user.name + ' ' + user.lastname;
        this.id = user.id;
        this.userForm.get('name')?.setValue(user.name);
        this.userForm.get('lastname')?.setValue(user.lastname);
        this.userForm.get('email')?.setValue(user.email);
        this.userForm.get('phone')?.setValue(user.phone);
        this.userForm.get('address')?.setValue(user.address);
      });
    }

    this.userForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        address: new FormControl('', Validators.required),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
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

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = {
        id: 50,
        name: this.userForm.get('name')?.value,
        lastname: this.userForm.get('lastname')?.value,
        password: this.userForm.get('password')?.value,
        email: this.userForm.get('email')?.value,
        phone: this.userForm.get('phone')?.value,
        address: this.userForm.get('address')?.value,
      };

      console.log(userData);
      this.userService.updateUser(userData).subscribe((res) => {
        if (res) {
          this.dialog.open(SuccesDialogComponent, {
            width: '300px',
            height: '200px',
            data: { message: 'Datos actualizados correctamente' },
          });

          timer(2000).subscribe((_) => {
            this.router.navigate(['/']);
          });
        }
      });
    }
  }
}
