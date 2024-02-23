import { FooterComponent } from '@/app/shared/layout/components/footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { home as langEs } from '@/assets/i18n/es.json';
import { home as langEn } from '@/assets/i18n/en.json';
// import * as langEs from '@/assets/i18n/es.json';
// import * as langEn from '@/assets/i18n/en.json';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  idioma = 'castellano';
  textos: any;

  ngOnInit(): void {
    this.setIdioma();
  }

  setIdioma() {
    if (this.idioma === 'castellano') {
      this.textos = langEs;
    } else {
      this.textos = langEn;
    }
  }

  cambiarIdioma(idiomaSeleccionado: string) {
    this.idioma = idiomaSeleccionado;
    this.setIdioma();
  }
}
