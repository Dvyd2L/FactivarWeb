import { Injectable, inject } from '@angular/core';
import { StorageKeyEnum } from '@/app/models/enums/storage.enum';
import { BehaviorSubject } from 'rxjs';
import { UUID } from 'node:crypto';
import { StorageService } from './storage.service';
import { RolesEnum } from '@/app/models/enums/roles.enum';
/**
 * Servicio para gestionar la información del usuario.
 * @template T - Tipo de objeto que representa al usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService<T extends { sid: UUID; token: string, role: RolesEnum }> {
  private storage = inject(StorageService);
  private currentUserSubject = new BehaviorSubject<T>(null!);
  public user$ = this.currentUserSubject.asObservable();

  constructor() {
    this.currentUserSubject.next(this.storage.get(StorageKeyEnum.User)!);
  }
  /**
   * Obtiene un observable que emite el usuario actual.
   * @returns Observable que emite el usuario actual.
   */
  public getUser(): T | null {
    return this.storage.get(StorageKeyEnum.User);
    // return this.user$;
  }
  /**
   * Actualiza la información del usuario.
   * @param user - Nuevo objeto de usuario.
   */
  public updateUser(user: T) {
    this.storage.set(StorageKeyEnum.Token, user.token);
    this.storage.set(StorageKeyEnum.User, user);
    this.currentUserSubject.next(user);
  }
  /**
   * Elimina la información del usuario.
   */
  public clearUser() {
    this.storage.remove(StorageKeyEnum.Token);
    this.storage.remove(StorageKeyEnum.User);
    this.currentUserSubject.next(null!);
  }
  /**
   * Verifica si el usuario actual tiene rol administrador
   */
  public isAdmin() {
    return this.currentUserSubject.value?.role === RolesEnum.Admin;
  }
}
