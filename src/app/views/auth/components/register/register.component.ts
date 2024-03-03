import { AfterViewInit, Component, inject } from '@angular/core';
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
import { REGEXP } from '../../validators/regexp';
import { IRegisterRequest } from '@/app/models/interfaces/auth';
import { ToastService } from '@/app/core/services/toast.service';

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
export class RegisterComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
  private toastSvc = inject(ToastService);
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
  public avatar: File | null = null;

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
      this.avatar = file;
    }
  }
  /**
   * Realiza el registro del usuario.
   */
  public register() {
    if (this.registerForm.valid && this.validPass()) {
      const register = {
        ...this.registerForm.value,
        avatar: this.avatar,
      } as IRegisterRequest;
      
      this.auth.register(register).subscribe({
        next: (data) => {
          console.log(data);
          this.toastSvc.add({
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
          this.toastSvc.add({
            title: 'error',
            message: err?.error?.message ?? 'algo salió mal',
            type: 'error',
            life: 3000,
          });
        },
      });
    } else {
      this.toastSvc.add({
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
      this.toastSvc.add({
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
