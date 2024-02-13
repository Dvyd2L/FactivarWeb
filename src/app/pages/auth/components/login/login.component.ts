import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

type LoginForm = FormGroup<{
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}>;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  // providers: [MessageService, AuthService],
})
export class LoginComponent {
  // private auth = inject(AuthService);
  // private messageService = inject(MessageService);
  private regexp_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
  public loginForm: LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      // Validators.minLength(8),
      Validators.pattern(this.regexp_password),
    ]),
  });

  public setPassword(value: string) {
    // this.infoLogin.password = value;
  }
  /**
   * Emite la peticíon de inicio de sesion al backend.
   */
  public login() {
    if (this.loginForm.valid) {
      // Realiza acciones como iniciar sesión o enviar datos al servidor
      console.log('Formulario válido. Datos enviados:', this.loginForm.value);
      // this.auth.login(this.infoLogin).subscribe({
      //   next: (data) => console.log({ data }),
      //   error: (err) => {
      //     console.error({ err });
      //     if (err instanceof HttpErrorResponse) {
      //       this.errorMessage(err, this.messageService);
      //     }
      //   },
      // });
    } else {
      // Muestra errores si el formulario no es válido
      console.log('Formulario inválido. Verifica los campos.');
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
