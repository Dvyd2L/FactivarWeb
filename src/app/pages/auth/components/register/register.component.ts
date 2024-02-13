import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@/app/pages/auth/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
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
