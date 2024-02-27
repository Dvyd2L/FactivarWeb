import { StorageKeyEnum } from '@/app/models/enums/storage.enum';
import { IRegisterRequest } from '@/app/models/interfaces/auth';
import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap, Observable, mergeMap } from 'rxjs';
import { ILoginRequest } from '@/app/models/interfaces/user';
import { StorageService } from '@/app/core/services/storage.service';
import { UserService } from '@/app/core/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSvc = inject(UserService);
  private http = inject(HttpClient);
  private urlAPI: string = environment.urlAPI + 'auth';
  /**
   * Realiza el inicio de sesión.
   * @param credenciales Las credenciales del usuario.
   */
  public login(credenciales?: ILoginRequest) {
    return this.http
      .post<{ token: string }>(`${this.urlAPI}/login`, credenciales)
      .pipe(
        tap(({ token }) => {
          const jwtHelper = new JwtHelperService();
          const payload = jwtHelper.decodeToken(token);
          this.userSvc.updateUser({
            ...payload,
            token,
          });
        })
      );
  }
  /**
   * Realiza el inicio de sesión con Google.
   * @param idToken El token de autenticación de Google.
   */
  public loginWithGoogle(idToken?: string) {
    return this.http
      .post<{ token: string }>(`${this.urlAPI}/google-authenticate`, idToken)
      .pipe(
        tap(({ token }) => {
          // this.storage.setItem(StorageKeyEnum.Token, token);
          // const helper = new JwtHelperService();
          // const payload = helper.decodeToken(response.token);
          // const user: IUserPayload = {
          //   ...payload,
          //   token: response.token,
          // };
          // this.userService.updateUser(user);
        })
      );
  }
  /**
   * Cierra la sesión del usuario.
   * @param email El correo electrónico del usuario.
   * @returns Una solicitud HTTP para cerrar la sesión.
   */
  public logout({ email }: { email: string }) {
    this.userSvc.clearUser();
    return this.http.post(`${this.urlAPI}/logout`, { email });
  }
  /**
   * Registra un nuevo usuario.
   * @param registro Los datos de registro del usuario.
   * @returns Un observable con los datos del usuario registrado.
   */
  public register(registro: IRegisterRequest): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', registro.nombre);
    formData.append('apellidos', registro.apellidos);
    formData.append('email', registro.email);
    formData.append('password', registro.password);
    if (registro.telefono) {
      formData.append('telefono', registro.telefono.toString());
    }
    if (registro.avatar && registro.avatar instanceof File) {
      formData.append('avatar', registro.avatar, registro.avatar.name);
    }
    return this.http.post<any>(`${this.urlAPI}/register`, formData);
  }
  /**
   * Actualiza el token de acceso.
   * @returns Una solicitud HTTP para actualizar el token de acceso.
   */
  public refreshToken() {
    // const currentUser = this.userService.userValue;
    // const token = currentUser.token;
    // return this.http.post<IUserPayload>(`${this.urlAPI}/auth/refreshtoken`, {
    //   token,
    // });
  }
  /**
   * Limpia los datos de usuario almacenados y redirige a la página de inicio de sesión.
   */
  public clearStorage() {
    // this.userService.clearUser();
  }

  public changePassword(data: ILoginRequest) {
    return this.http
      .put<{ msg: string }>(`${this.urlAPI}/change-password`, data)
      .pipe(
        mergeMap(({ msg }) =>
          this.http.get(`${this.urlAPI}/change-password/${msg}`)
        )
      );
  }
}
