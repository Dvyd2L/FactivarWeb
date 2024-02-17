import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@/app/views/auth/services/auth.service';
import { REGEXP } from '@/app/views/auth/validators/regexp';
import { ILoginRequest } from '@/app/models/interfaces/user';
import { email, password } from '@/app/views/auth/forms-config.json';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [/* MessageService, */ AuthService],
})
export class LoginComponent {
  private auth = inject(AuthService);
  // private messageService = inject(MessageService);
  public loginForm = new FormGroup({
    email: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.pattern(REGEXP['PASSWORD']),
    ]),
  });
  public formConfig = {
    email: {
      ...email
    },
    password: {
      ...password,
    },
  };

  public setPassword(value: string) {
    // this.infoLogin.password = value;
  }
  /**
   * Emite la peticíon de inicio de sesion al backend.
   */
  public login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value as ILoginRequest;
      if (email && password) {
        this.auth.login({ email, password }).subscribe({
          next: (response) => console.log({ response }),
          error: (err) => {
            console.error({ err });
            // if (err instanceof HttpErrorResponse) {
            //   this.errorMessage(err, this.messageService);
            // }
          },
        });
      } else {
        // Muestra errores si el formulario no es válido
        console.log('Formulario inválido. Verifica los campos.');
      }
    }
  }
  /**
   * Realiza el inicio de sesión con Google.
   * @param idToken - Token de identificación de Google.
   */
  public loginWithGoogle(idToken: string) {
    // this.auth.loginWithGoogle(idToken);
  }
  // private errorMessage = addMessage;
}
