import { FooterComponent } from '@/app/shared/layout/components/footer/footer.component';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TraductorService } from '@/app/core/services/traductor.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private traductor = inject(TraductorService);
  textos = this.traductor.textos.home;

  cambiarIdioma(idiomaSeleccionado: string) {
    this.traductor.cambiarIdioma(idiomaSeleccionado);
    this.textos = this.traductor.textos.home;
  }
}
