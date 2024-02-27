import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { REGEXP } from '@/app/views/auth/validators/regexp';
import {
  email,
  oldPassword,
  newPassword,
} from '@/app/views/auth/forms-config.json';
import { AuthService } from '../../services/auth.service';
import { Email } from '@/app/models/interfaces/user';
import { ToastService } from '@/app/core/services/toast.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  providers: [AuthService],
})
export class ChangePasswordComponent {
  private toastSvc = inject(ToastService);
  private auth = inject(AuthService);
  public form = new FormGroup(
    {
      email: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.email,
      ]),
      oldPassword: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.pattern(REGEXP['PASSWORD']),
      ]),
      newPassword: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.pattern(REGEXP['PASSWORD']),
      ]),
    },
    { updateOn: 'blur' }
  );
  public config = {
    email: {
      ...email,
    },
    oldPassword: {
      ...oldPassword,
    },
    newPassword: {
      ...newPassword,
    },
  };

  public onSubmit() {
    if (this.form.valid) {
      this.auth
        .changePassword({
          email: this.form.value.email as Email,
          password: this.form.value.oldPassword!,
        })
        .subscribe({
          next: (res) => {
            console.log({ res });
            this.toastSvc.add({
              title: 'éxito',
              message: 'la operación se ha completado con éxito.',
              type: 'success',
              life: 3000,
            });
          },
          error: (err) => {
            console.error({ err });
            this.toastSvc.add({
              title: 'error',
              message: err?.error?.message ?? 'algo salió mal',
              type: 'error',
              life: 3000,
            });
          },
        });

      this.form.reset();
    }
  }
}
