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
  private currentUserSubject = new BehaviorSubject<T>(null!);
  public user$ = this.currentUserSubject.asObservable();
  /**
   * Obtiene un observable que emite el usuario actual.
   * @returns Observable que emite el usuario actual.
   */
  public getUser(): Observable<T> {
    return this.user$;
  }
  /**
   * Obtiene el token del usuario actual.
   * @returns Token del usuario actual.
   */
  public getToken(): string {
    return this.currentUserSubject.value && this.currentUserSubject.value.token
      ? this.currentUserSubject.value.token
      : '';
  }
  /**
   * Actualiza la información del usuario.
   * @param user - Nuevo objeto de usuario.
   */
  public updateUser(user: T) {
    this.currentUserSubject.next(user);
  }
  /**
   * Elimina la información del usuario.
   */
  public clearUser() {
    this.currentUserSubject.next(null!);
  }
}
