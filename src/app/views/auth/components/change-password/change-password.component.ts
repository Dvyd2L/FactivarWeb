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
import { tap } from 'rxjs';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  providers: [AuthService],
})
export class ChangePasswordComponent {
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
        .subscribe((res) => console.log({ res }));

      this.form.reset();
    }
  }
}
