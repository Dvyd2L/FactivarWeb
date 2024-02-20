import { StorageKeyEnum } from '@/app/models/enums/storage.enum';
import { afterRender } from '@angular/core';
/**
 * Clase de ayuda para el manejo del almacenamiento local y de sesión.
 */
export class StorageHelper {
  /**
   * Establece un valor en el almacenamiento local o de sesión.
   * @param key La clave del valor a establecer.
   * @param value El valor a establecer.
   * @param useSessionStorage Indica si se debe utilizar el almacenamiento de sesión. Por defecto es verdadero.
   */
  public static setItem(
    key: StorageKeyEnum,
    value: any,
    useSessionStorage: boolean = false
  ): void {
    // afterRender(() => {
    //   const storage = useSessionStorage ? sessionStorage : localStorage;
    //   storage.setItem(key, JSON.stringify(value));
    // });
    const storage = useSessionStorage ? sessionStorage : localStorage;
    storage.setItem(key, JSON.stringify(value));
  }
  /**
   * Obtiene un valor del almacenamiento local o de sesión.
   * @param key La clave del valor a obtener.
   * @param useSessionStorage Indica si se debe utilizar el almacenamiento de sesión. Por defecto es verdadero.
   * @returns El valor obtenido o nulo si no se encuentra.
   */
  public static getItem<T>(
    key: StorageKeyEnum,
    useSessionStorage: boolean = false
  ): T | null {
    // let item = null;
    // afterRender(() => {
    //   const storage = useSessionStorage ? sessionStorage : localStorage;
    //   item = storage.getItem(key);
    //   // return item ? JSON.parse(item) : null;
    // });
    const storage = useSessionStorage ? sessionStorage : localStorage;
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  /**
   * Elimina un valor del almacenamiento local o de sesión.
   * @param key La clave del valor a eliminar.
   * @param useSessionStorage Indica si se debe utilizar el almacenamiento de sesión. Por defecto es verdadero.
   */
  public static removeItem(
    key: StorageKeyEnum,
    useSessionStorage: boolean = false
  ): void {
    // afterRender(() => {
    //   const storage = useSessionStorage ? sessionStorage : localStorage;
    //   storage.removeItem(key);
    // });
    const storage = useSessionStorage ? sessionStorage : localStorage;
    storage.removeItem(key);
  }
  /**
   * Limpia todo el almacenamiento local o de sesión.
   * @param useSessionStorage Indica si se debe utilizar el almacenamiento de sesión. Por defecto es verdadero.
   */
  public static clear(useSessionStorage: boolean = false): void {
    // afterRender(() => {
    //   const storage = useSessionStorage ? sessionStorage : localStorage;
    //   storage.clear();
    // });
    const storage = useSessionStorage ? sessionStorage : localStorage;
    storage.clear();
  }
}
