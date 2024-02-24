import { Injectable } from '@angular/core';
import * as langEs from '@/assets/i18n/es.json';
import * as langEn from '@/assets/i18n/en.json';
import { ITraductor } from '@/app/models/interfaces/traductor';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TraductorService {
  private idioma = 'castellano';
  private textos = new BehaviorSubject<ITraductor>(langEs);
  public textos$ = this.textos.asObservable();

  private setIdioma() {
    if (this.idioma === 'castellano') {
      this.textos.next(langEs);
    } else {
      this.textos.next(langEn);
    }
  }

  public cambiarIdioma(idiomaSeleccionado: string) {
    this.idioma = idiomaSeleccionado;
    this.setIdioma();
  }
}
