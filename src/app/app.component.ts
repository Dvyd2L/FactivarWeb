import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TraductorService } from './core/services/traductor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
})
export class AppComponent {
  private traductor = inject(TraductorService);
  public title = 'FactivarWeb';

  public cambiarIdioma(idiomaSeleccionado: string) {
    this.traductor.cambiarIdioma(idiomaSeleccionado);
  }
}
