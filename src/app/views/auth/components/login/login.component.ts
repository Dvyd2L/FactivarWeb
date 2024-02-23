import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@/app/views/auth/services/auth.service';
import { REGEXP } from '@/app/views/auth/validators/regexp';
import { ILoginRequest } from '@/app/models/interfaces/user';
import { email, password } from '@/app/views/auth/forms-config.json';
import { toastHelper } from '@/app/core/helpers/toast.helper';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements AfterViewInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  @ViewChild('toastContainer', { read: ViewContainerRef })
  public toast!: ViewContainerRef;
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
      ...email,
    },
    password: {
      ...password,
    },
  };

  public addToast!: ({
    title,
    message,
    type,
    life,
  }: {
    title: string;
    message: string;
    type: string;
    life: number;
  }) => void;

  ngAfterViewInit(): void {
    this.addToast = toastHelper(this.toast);
  }

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
          next: (response) => {
            this.addToast({
              title: 'éxito',
              message: 'la operación se ha completado con éxito.',
              type: 'success',
              life: 3000,
            });
            setTimeout(() => {
              this.router.navigate(['/clientes']);
            }, 3000);
          },
          error: (err) => {
            console.error({ err });
            this.addToast({
              title: 'error',
              message: err?.error?.message ?? 'algo salió mal',
              type: 'error',
              life: 3000,
            });
          },
        });
      } else {
        // Muestra errores si el formulario no es válido
        console.log('Formulario inválido. Verifica los campos.');
        this.addToast({
          title: 'Formulario inválido',
          message: 'Verifica los campos.',
          type: 'error',
          life: 3000,
        });
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
}
