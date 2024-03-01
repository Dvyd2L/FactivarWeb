import { UUID } from 'node:crypto';
import { RolesEnum } from '../enums/roles.enum';
/**
 * Interfaz base para un usuario.
 */
export interface IUserBase {
  email: Email;
  nombre: string;
  apellidos: string;
  telefono?: number | string;
}
/**
 * Interfaz para los datos de un usuario.
 */
export interface IUser {
  sid: UUID;
  email: string;
  name: string;
  surname: string;
  role: RolesEnum;
  thumbprint: string;
  mobilephone?: string;
  exp: number;
  iss: string;
  aud: string;
  token: string;
}
/**
 * Interfaz extendida para un usuario completo.
 */
export interface IFullUser extends IUserBase {
  id?: UUID;
  avatar?: File;
  avatarUrl?: string | URL;
  password?: string;
  rol?: number | string;
  isAdmin?: boolean;
}
/**
 * Interfaz para registrar un usuario.
 */
export interface IRegisterRequest extends IUserBase {
  avatar?: File;
  password: string;
}
/**
 * Interfaz para iniciar sesión de un usuario.
 */
export interface ILoginRequest
  extends Omit<IUserBase, 'nombre' | 'apellidos' | 'telefono'> {
  password: string;
}
/**
 * Interfaz para cambiar la contraseña de un usuario.
 */
export interface IUserChangePassword extends Omit<ILoginRequest, 'password'> {
  oldPassword?: string;
  newPassword: string;
}
/**
 * Respuesta de inicio de sesión.
 */
export interface ILoginResponse {
  token: string;
}
/**
 * Tipo para representar una dirección de correo electrónico.
 */
export type Email = `${string}@${string}.${string}`;
/**
 * Tipo para representar un token JWT.
 */
export type Token = `${string}.${string}.${string}`;
