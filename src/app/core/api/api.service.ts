import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment.development';
import { ApiEndpointEnum } from '@/app/models/enums/api.enum';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private urlAPI = environment.urlAPI + 'api';
  private endpoint!:string;

  public setEndpoint(endpoint: ApiEndpointEnum) {
    this.endpoint = endpoint;
  }
  /**
   * Obtiene datos de la API, si no se proporciona el id obtiene todos los registros
   * @template TId El tipo de dato del id
   * @template TResponse El tipo de dato de la respuesta
   * @param {TId} id El id de los datos
   * @returns Un Observable que emite un objeto de tipo TResponse si se proporciona el id y una colección de objetos TResponse[] en el caso contrario.
   */
  public read<TId, TResponse>(
    id?: TId
  ): Observable<TResponse> {
    const headers = this.setHeaders();
    return id
      ? this.http.get<TResponse>(`${this.urlAPI}/${this.endpoint}/${id}`, {
          headers,
        })
      : this.http.get<TResponse>(`${this.urlAPI}/${this.endpoint}`, {
          headers,
        });
  }
  /**
   * Agrega un nuevo cliente.
   * @param cliente El objeto de tipo ICliente a agregar.
   * @returns Un Observable que emite un objeto de tipo ICliente.
   */
  public create<TData, TResponse>(data: TData): Observable<TResponse> {
    const headers = this.setHeaders();
    return this.http.post<TResponse>(`${this.urlAPI}/${this.endpoint}`, data, {
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
    return this.http.put<TResponse>(`${this.urlAPI}/${this.endpoint}`, data, {
      headers,
    });
  }
  /**
   * Elimina un cliente por su CIF.
   * @param cif El CIF del cliente a eliminar.
   * @returns Un Observable que emite un objeto de tipo ICliente.
   */
  public delete<TId, TResponse>(id: TId): Observable<TResponse> {
    const headers = this.setHeaders();
    return this.http.delete<TResponse>(`${this.urlAPI}/${this.endpoint}/${id}`, {
      headers,
    });
  }
  /**
   * Establece los encabezados de la solicitud HTTP.
   * @returns {HttpHeaders} 'Content-Type': 'application/json'
   */
  private setHeaders = (): HttpHeaders =>
    new HttpHeaders({
      'Content-Type': 'application/json',
    });
}
