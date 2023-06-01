import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
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
  hide3 = true;
  name: string = '';
  id: number | undefined;
  disabled: boolean = true;

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
        this.id = user.user_id;
        this.userForm.get('name')?.setValue(user.name);
        this.userForm.get('lastname')?.setValue(user.lastname);
        this.userForm.get('email')?.setValue(user.email);
        this.userForm.get('phone')?.setValue(user.phone);
        this.userForm.get('address')?.setValue(user.address);
        console.log(this.id);
      });
    }

    this.userForm = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl({ value: '', disabled: this.disabled }),
        address: new FormControl('', Validators.required),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]{9}$'),
        ]),
        // checkbox para cambiar contraseña
        changePassword: new FormControl(false),

        currentPassword: new FormControl({ value: '', disabled: true }, [
          this.validateCurrentPassword.bind(this),
        ]),
        newPassword: new FormControl({ value: '', disabled: true }),
        confirmPassword: new FormControl({ value: '', disabled: true }),
      },
      { validator: this.passwordMatchValidator }
    );

    // Escuchar cambios en el campo de selección de cambiar contraseña
    this.userForm.get('changePassword')?.valueChanges.subscribe((value) => {
      if (value) {
        // Habilitar los campos de contraseña si el usuario selecciona cambiarla
        this.userForm.get('currentPassword')?.enable();
        this.userForm.get('newPassword')?.enable();
        this.userForm.get('confirmPassword')?.enable();
      } else {
        // Deshabilitar los campos de contraseña si el usuario no selecciona cambiarla
        this.userForm.get('currentPassword')?.disable();
        this.userForm.get('newPassword')?.disable();
        this.userForm.get('confirmPassword')?.disable();
        // Reiniciar los valores de los campos de contraseña
        this.userForm.get('currentPassword')?.setValue('');
        this.userForm.get('newPassword')?.setValue('');
        this.userForm.get('confirmPassword')?.setValue('');
      }
    });
  }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    const password = control.get('newPassword')?.value;
    const password2 = control.get('confirmPassword')?.value;

    if (password === password2) {
      return null;
    } else {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
  };

  validateCurrentPassword(control: AbstractControl): ValidationErrors | null {
    const currentPassword = control.value;
    const storedPassword = this.userService.getStoredPassword();

    if (currentPassword !== storedPassword) {
      return { incorrectPassword: true };
    }

    return null;
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const name = this.userForm.get('name')?.value;
      const lastname = this.userForm.get('lastname')?.value;
      const email = this.userForm.get('email')?.value;
      const phone = this.userForm.get('phone')?.value;
      const address = this.userForm.get('address')?.value;
      let password = '';

      // Obtener el estado del checkbox de cambio de contraseña
      const isChangePassword = this.userForm.get('changePassword')?.value;

      if (isChangePassword) {
        // Si se seleccionó cambiar contraseña, obtener la nueva contraseña
        password = this.userForm.get('newPassword')?.value;
      } else {
        // Si no se seleccionó cambiar contraseña, obtener la contraseña actual
        password = sessionStorage.getItem('password') || '';
      }

      const userData = {
        user_id: this.id,
        name: name,
        lastname: lastname,
        email: email,
        phone: phone,
        address: address,
        password: password, // Agregar la contraseña al objeto de datos
      };

      console.log(userData);
      this.userService.updateUser(userData).subscribe((res) => {
        if (res) {
          this.dialog.open(SuccesDialogComponent, {
            data: { message: 'Datos actualizados correctamente' },
          });

          timer(2000).subscribe((_) => {
            sessionStorage.setItem('password', password);
            this.dialog.closeAll();
            this.router.navigate(['/']);
          });
        }
      });
    }
  }
}
