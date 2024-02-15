import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RolesEnum } from '@/app/models/enums/roles.enum';
import { StorageKeyEnum } from '@/app/models/enums/storage.enum';
import { StorageHelper } from '@/app/core/helpers/storage.helper';
/**
 * Guardia que permite el acceso solo a los usuarios con el rol de administrador.
 * Si el usuario no tiene el rol de administrador, se redirige a la página de chat.
 * @returns {boolean} - Indica si el usuario tiene el rol de administrador y puede acceder.
 */
export const adminGuard: CanActivateFn = (): boolean => {
  const router = inject(Router);
  const user = StorageHelper.getItem<{ Role: RolesEnum }>(StorageKeyEnum.User);
  if (user?.Role === RolesEnum.Admin) {
    return true;
  }
  router.navigate(['/auth', 'login']);
  return false;
};
