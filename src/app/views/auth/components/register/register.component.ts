import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@/app/views/auth/services/auth.service';
import { ServiceTermsComponent } from '../service-terms/service-terms.component';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../auth.component.scss'],
  imports: [ReactiveFormsModule, RouterLink, ServiceTermsComponent],
})
export class RegisterComponent {
  // private router = inject(Router);
  private auth = inject(AuthService);
  // private messageService = inject(MessageService);
  public infoRegister = {
    nombre: '',
    apellidos: '',
    avatar: undefined,
    email: '',
    telefono: '',
    password: '',
  };
  public password: string = '';
  public serviceTermsVisibility = false;
  /**
   * Cambia el estado de visibilidad de las condiciones de servicio.
   */
  public toggleServiceTermsVisibility() {
    this.serviceTermsVisibility = !this.serviceTermsVisibility;
  }
  /**
   * Maneja el evento de selección de archivo.
   * @param event - Evento de selección de archivo.
   */
  public onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (file) {
      // this.infoRegister.avatar = file;
    }
  }
  /**
   * Realiza el registro del usuario.
   */
  public register() {
    this.auth.register(this.infoRegister).subscribe({
      next: (data) => {
        console.log(data);
        // this.router.navigateByUrl('login');
      },
      error: (err) => {
        // if (err instanceof HttpErrorResponse) {
        //   this.errorMessage(err, this.messageService);
        // }
      },
    });
  }
  /**
   * Valida si la contraseña y la contraseña de repetición coinciden.
   */
  public validPass() {
    // if (this.infoRegister.password !== this.password) {
    //   console.log('Las contraseñas no coinciden');
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'Error',
    //     detail: 'Las contraseñas no coinciden',
    //   });
    // }
  }
  // private errorMessage = addMessage;
}
