export interface IRegisterRequest {
  email: Email;
  nombre: string;
  apellidos: string;
  telefono?: number | string;
  avatar?: File;
  password: string;
}