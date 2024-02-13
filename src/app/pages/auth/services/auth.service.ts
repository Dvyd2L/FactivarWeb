import { StorageKeyEnum } from '@/app/enums/storage.enum';
import { StorageHelper } from '@/app/helpers/storage.helper';
import { IRegisterRequest } from '@/app/interfaces/auth';
import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  // private userService = inject(UserService<IUserPayload>);
  private urlAPI: string = environment.urlAPI + 'auth';
  /**
   * Realiza el inicio de sesión.
   * @param credenciales Las credenciales del usuario.
   */
  public login(credenciales?: { email: string; password: string }) {
    return this.http
      .post<{ token: string }>(`${this.urlAPI}/login`, credenciales)
      .pipe(
        tap(({ token }) => {
          StorageHelper.setItem(StorageKeyEnum.Token, token)
          // const helper = new JwtHelperService();
          // const payload = helper.decodeToken(token) as IUserPayload;
          // this.userService.updateUser({
          //   ...payload,
          //   token,
          // });
          // this.userService
          //   .getUser()
          //   .subscribe({ next: (data) => console.log(data) });
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
        tap((data) => {
          // const helper = new JwtHelperService();
          // const payload = helper.decodeToken(data.token);
          // const user: IUserPayload = {
          //   ...payload,
          //   token: data.token,
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
    // this.userService.clearUser();
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
}
