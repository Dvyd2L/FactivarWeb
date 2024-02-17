import { Component } from '@angular/core';
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

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
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
    console.log(this.form.value);
    this.form.reset();
  }
}
