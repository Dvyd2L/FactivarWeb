import { StorageKeyEnum } from '@/app/models/enums/storage.enum';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, afterRender } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private localStorage!: Storage;
  private sessionStorage!: Storage;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.localStorage = window.localStorage;
      this.sessionStorage = window.sessionStorage;
    }
  }
  /**
   * Establece un valor en el almacenamiento local o de sesión.
   * @param key La clave del valor a establecer.
   * @param value El valor a establecer.
   * @param useSessionStorage Indica si se debe utilizar el almacenamiento de sesión. Por defecto es verdadero.
   */
  public set(
    key: StorageKeyEnum,
    value: any,
    useSessionStorage: boolean = false
  ): void {
    const storage = useSessionStorage ? this.sessionStorage : this.localStorage;
    storage?.setItem(key, JSON.stringify(value));
  }
  /**
   * Obtiene un valor del almacenamiento local o de sesión.
   * @param key La clave del valor a obtener.
   * @param useSessionStorage Indica si se debe utilizar el almacenamiento de sesión. Por defecto es verdadero.
   * @returns El valor obtenido o nulo si no se encuentra.
   */
  public get<T>(
    key: StorageKeyEnum,
    useSessionStorage: boolean = false
  ): T | null {
    const storage = useSessionStorage ? this.sessionStorage : this.localStorage;
    const item = storage?.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  /**
   * Elimina un valor del almacenamiento local o de sesión.
   * @param key La clave del valor a eliminar.
   * @param useSessionStorage Indica si se debe utilizar el almacenamiento de sesión. Por defecto es verdadero.
   */
  public remove(
    key: StorageKeyEnum,
    useSessionStorage: boolean = false
  ): void {
    const storage = useSessionStorage ? this.sessionStorage : this.localStorage;
    storage?.removeItem(key);
  }
  /**
   * Limpia todo el almacenamiento local o de sesión.
   * @param useSessionStorage Indica si se debe utilizar el almacenamiento de sesión. Por defecto es verdadero.
   */
  public clear(useSessionStorage: boolean = false): void {
    const storage = useSessionStorage ? this.sessionStorage : this.localStorage;
    storage?.clear();
  }
}
