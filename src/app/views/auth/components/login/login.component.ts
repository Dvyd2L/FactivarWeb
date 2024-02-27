import {
  AfterViewInit,
  Component,
  OnInit,
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
import { TraductorService } from '@/app/core/services/traductor.service';
import { IFormInput } from '@/app/models/interfaces/form';
import { LoginSection } from '@/app/models/interfaces/traductor';
import { ToastService } from '@/app/core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  private i18n = inject(TraductorService);
  private auth = inject(AuthService);
  private toastSvc = inject(ToastService);
  private router = inject(Router);
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
  public formConfig: { email: IFormInput; password: IFormInput } = {
    email: { ...email },
    password: { ...password },
  };
  public textos!: LoginSection;

  /* hooks */
  ngOnInit(): void {
    this.i18n.textos$.subscribe(({ auth }) => {
      const { login } = auth.sections;
      const { email: mail, password: pass } = login.form;
      this.textos = login;
      this.formConfig.email = {
        ...email,
        ...mail,
      };
      this.formConfig.password = {
        ...password,
        ...pass,
      };
    });
  }
  /* end hooks */

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
            this.toastSvc.add({
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
            this.toastSvc.add({
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
        this.toastSvc.add({
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
