import { Injectable } from '@angular/core';
import * as langEs from '@/assets/i18n/es.json';
import * as langEn from '@/assets/i18n/en.json';
import { ITraductor } from '@/app/models/interfaces/traductor';

@Injectable({
  providedIn: 'root',
})
export class TraductorService {
  private idioma = 'castellano';
  public textos: ITraductor = langEs;

  private setIdioma() {
    if (this.idioma === 'castellano') {
      this.textos = langEs;
    } else {
      this.textos = langEn;
    }
  }

  public cambiarIdioma(idiomaSeleccionado: string) {
    this.idioma = idiomaSeleccionado;
    this.setIdioma();
  }
}
