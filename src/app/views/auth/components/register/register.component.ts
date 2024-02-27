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
import { ServiceTermsComponent } from '../service-terms/service-terms.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { toastHelper } from '@/app/core/helpers/toast.helper';
import { REGEXP } from '../../validators/regexp';
import { IRegisterRequest } from '@/app/models/interfaces/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ServiceTermsComponent,
    ModalComponent,
  ],
  providers: [],
})
export class RegisterComponent implements AfterViewInit {
  private router = inject(Router);
  private auth = inject(AuthService);
  @ViewChild('toastContainer', { read: ViewContainerRef })
  public toast!: ViewContainerRef;
  public registerForm = new FormGroup({
    nombre: new FormControl<string>({ value: '', disabled: false }, [
      Validators.required,
    ]),
    apellidos: new FormControl<string>({ value: '', disabled: false }, [
      Validators.required,
    ]),
    avatar: new FormControl<File | null>({ value: null, disabled: false }),
    email: new FormControl<string>({ value: '', disabled: false }, [
      Validators.required,
      Validators.email,
    ]),
    telefono: new FormControl<string>({ value: '', disabled: false }),
    serviceTerms: new FormControl<boolean>({ value: false, disabled: false }, [
      Validators.requiredTrue,
    ]),
    password: new FormControl<string>({ value: '', disabled: false }, [
      Validators.required,
      Validators.pattern(REGEXP['PASSWORD']),
    ]),
  });
  public password = new FormControl<string>({ value: '', disabled: false }, [
    Validators.required,
    Validators.pattern(REGEXP['PASSWORD']),
  ]);
  public termsModal = false;

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

  public toggleServiceTermsVisibility() {
    this.termsModal = !this.termsModal;
  }
  /**
   * Maneja el evento de selección de archivo.
   * @param event - Evento de selección de archivo.
   */
  public onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (file) {
      this.registerForm.controls.avatar.setValue(file);
    }
  }
  /**
   * Realiza el registro del usuario.
   */
  public register() {
    if (this.registerForm.valid && this.validPass()) {
      this.auth
        .register(this.registerForm.value as IRegisterRequest)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.addToast({
              title: 'éxito',
              message: 'la operación se ha completado con éxito.',
              type: 'success',
              life: 3000,
            });
            setTimeout(() => {
              this.router.navigate(['/auth', 'login']);
            }, 3000);
          },
          error: (err) => {
            this.addToast({
              title: 'error',
              message: err?.error?.message ?? 'algo salió mal',
              type: 'error',
              life: 3000,
            });
          },
        });
    } else {
      this.addToast({
        title: 'Formulario inválido',
        message: 'Verifica los campos.',
        type: 'error',
        life: 3000,
      });
    }
  }
  /**
   * Valida si la contraseña y la contraseña de repetición coinciden.
   */
  public validPass() {
    if (this.registerForm.controls.password.value !== this.password.value) {
      this.addToast({
        title: 'error',
        message: 'Las contraseñas no coinciden.',
        type: 'error',
        life: 3000,
      });
      return false;
    }
    return true;
  }
}
