import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TraductorService } from './core/services/traductor.service';
import { ThemeToggleComponent } from "./shared/components/theme-toggle/theme-toggle.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [],
    imports: [RouterOutlet, ThemeToggleComponent]
})
export class AppComponent {
  private traductor = inject(TraductorService);
  public title = 'FactivarWeb';

  public cambiarIdioma(idiomaSeleccionado: string) {
    this.traductor.cambiarIdioma(idiomaSeleccionado);
  }
}
