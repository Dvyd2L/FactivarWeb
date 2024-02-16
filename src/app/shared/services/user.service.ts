import { Injectable, inject } from '@angular/core';
import { StorageHelper } from '@/app/core/helpers/storage.helper';
import { StorageKeyEnum } from '@/app/models/enums/storage.enum';
import { IUser } from '@/app/models/interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { UUID } from 'node:crypto';
/**
 * Servicio para gestionar la información del usuario.
 * @template T - Tipo de objeto que representa al usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService<T extends { Sid: UUID; token: string }> {
  // private idxDB = inject(IndexedDBService);
  private currentUserSubject = new BehaviorSubject<T>(null!);
  public user$ = this.currentUserSubject.asObservable();
  /**
   * Obtiene el valor actual del usuario.
   */
  public get userValue(): T {
    return this.currentUserSubject.value;
  }
  /**
   * Obtiene un observable que emite el usuario actual.
   * @returns Observable que emite el usuario actual.
   */
  public getUser(): Observable<T> {
    return this.user$;
  }
  /**
   * Obtiene el token del usuario actual.
   * @returns Token del usuario actual o null si no hay usuario.
   */
  public getToken(): string | null {
    return this.userValue && this.userValue.token
      ? this.userValue.token
      : StorageHelper.getItem<IUser>(StorageKeyEnum.User)?.token ??
          StorageHelper.getItem(StorageKeyEnum.Token) ??
          null;
  }
  /**
   * Actualiza la información del usuario.
   * @param user - Nuevo objeto de usuario.
   */
  public updateUser(user: T) {
    StorageHelper.setItem(StorageKeyEnum.User, user);
    // this.userValue
    //   ? this.idxDB.create<T>(user, StoreEnum.USER)
    //   : this.idxDB.update<T>(user, StoreEnum.USER);
    this.currentUserSubject.next(user);
  }
  /**
   * Elimina la información del usuario.
   */
  public clearUser() {
    StorageHelper.removeItem(StorageKeyEnum.User);
    // this.idxDB.delete<T>(this.userValue.Sid, StoreEnum.USER);
    this.currentUserSubject.next(null!);
  }
}
