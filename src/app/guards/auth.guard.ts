import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageHelper } from '@/app/helpers/storage.helper';
import { StorageKeyEnum } from '@/app/enums/storage.enum';
/**
 * Función que actúa como guardia de autenticación para las rutas en Angular.
 * Comprueba si el usuario está autenticado antes de permitir el acceso a una ruta.
 * Si el usuario no está autenticado, redirige a la página de inicio de sesión.
 * @returns {boolean} - Devuelve true si el usuario está autenticado y puede acceder a la ruta, de lo contrario devuelve false.
 */
export const authGuard: CanActivateFn = (): boolean => {
  const router = inject(Router);
  const token = StorageHelper.getItem(StorageKeyEnum.Token);
  if (token) {
    return true;
  }
  router.navigate(['/auth', 'login']);
  return false;
};
