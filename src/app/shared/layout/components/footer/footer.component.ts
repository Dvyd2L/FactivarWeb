import { TraductorService } from '@/app/core/services/traductor.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private traductor = inject(TraductorService);
  textos = this.traductor.textos.footer;

  cambiarIdioma(idiomaSeleccionado: string) {
    this.traductor.cambiarIdioma(idiomaSeleccionado);
    this.textos = this.traductor.textos.footer;
  }
}
