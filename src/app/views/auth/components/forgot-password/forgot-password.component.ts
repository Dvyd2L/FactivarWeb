import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { email } from '@/app/views/auth/forms-config.json';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  public form = new FormGroup(
    {
      email: new FormControl({ value: '', disabled: false }, [
        Validators.email,
        Validators.required,
      ]),
    },
    { updateOn: 'blur' }
  );
  public config = {
    ...email,
    control: this.form.controls.email,
  };

  public onSubmit() {
    console.log(this.form.value);
    this.form.reset();
  }
}
