import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private userService = inject(UserService<IUserPayload>);
  private http = inject(HttpClient);
  private urlAPI = environment.urlAPI + 'api';
  /**
   * Obtiene datos de la API, si no se proporciona el id obtiene todos los registros
   * @param {TId} id El id de los datos
   * @returns Un Observable que emite un objeto de tipo TResponse si se proporciona el id y una colección de objetos TResponse[] en el caso contrario.
   */
  public read<TId, TResponse>(
    id?: TId
  ): Observable<TResponse> | Observable<TResponse[]> {
    const headers = this.setHeaders();

    return id
      ? this.http.get<TResponse>(`${this.urlAPI}/clientes/${id}`, {
          headers,
        })
      : this.http.get<TResponse[]>(`${this.urlAPI}/clientes/all`, {
          headers,
        });
  }
  /**
   * Obtiene los clientes dados de alta entre dos fechas.
   * @param fechamin La fecha mínima.
   * @param fechamax La fecha máxima.
   * @returns Un Observable que emite un array de objetos de tipo ICliente.
   */
  // public getClienteEntreFechas(
  //   fechamin: string | Date,
  //   fechamax: string | Date
  // ): Observable<ICliente[]> {
  //   const headers = this.setHeaders();
  //   return this.http.get<ICliente[]>(
  //     `${this.urlAPI}/clientes/alta-entre-fechas/${fechamin}/${fechamax}`,
  //     {
  //       headers,
  //     }
  //   );
  // }
  /**
   * Agrega un nuevo cliente.
   * @param cliente El objeto de tipo ICliente a agregar.
   * @returns Un Observable que emite un objeto de tipo ICliente.
   */
  public create<TData, TResponse>(data: TData): Observable<TResponse> {
    const headers = this.setHeaders();
    return this.http.post<TResponse>(`${this.urlAPI}/clientes`, data, {
      headers,
    });
  }
  /**
   * Actualiza un cliente existente.
   * @param cliente El objeto de tipo ICliente a actualizar.
   * @returns Un Observable que emite un objeto de tipo ICliente.
   */
  public update<TData, TResponse>(data: TData): Observable<TResponse> {
    const headers = this.setHeaders();
    return this.http.put<TResponse>(
      `${this.urlAPI}/clientes` /* /${cliente.cif} */,
      data,
      {
        headers,
      }
    );
  }
  /**
   * Elimina un cliente por su CIF.
   * @param cif El CIF del cliente a eliminar.
   * @returns Un Observable que emite un objeto de tipo ICliente.
   */
  public delete<TId, TResponse>(id: TId): Observable<TResponse> {
    const headers = this.setHeaders();
    return this.http.delete<TResponse>(`${this.urlAPI}/clientes/${id}`, {
      headers,
    });
  }
  /**
   *
   * @returns
   */
  private setHeaders = () =>
    new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${this.userService.getToken()}`,
    });
}
