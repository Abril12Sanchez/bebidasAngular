import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BebidaService {

  //atributos
  // baseUri: string = 'http://localhost:4000/api';
  baseUri: string = 'https://backendbebidas-1.onrender.com/api'; // Cambia esto a tu URL de API real
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { }

  //metodo para agregar las bebidas
  agregarBebida(data: any):Observable<any> {
    let url = `${this.baseUri}/agregar`;
    return this.http.post(url,data).pipe(catchError(this.errorManager))
  }

  //metodo para obtener todas las bebidas
  getBebidas(){
    let url = `${this.baseUri}/bebidas`;
    return this.http.get(url);
  }

  //metodo para obtener la bebida por la id
  getBebida(id:any): Observable<any> {
    let url = `${this.baseUri}/bebida/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(map((res:any) => {
      return res || {};
    }),
    catchError(this.errorManager)
    );
  }

  //metodo para actualizar bebidas
  actualizarBebida(id:any, data:any): Observable<any> {
    let url = `${this.baseUri}/actualizar/${id}`;
    return this.http.put(url, data, {headers: this.headers}).pipe(catchError(this.errorManager));
  }

  //metodo para eliminar una bebida
  eliminarBebida(id:any): Observable<any> {
    let url = `${this.baseUri}/eliminar/${id}`;
    return this.http.delete(url, {headers: this.headers}).pipe(catchError(this.errorManager));
  }
  private errorManager(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor: 
        Código: ${error.status}
        Mensaje: ${error.message}
        Detalles: ${error.error?.message || 'No disponible'}`;
    }
    
    console.error('Error en servicio de la Bebida:', errorMessage, error);
    return throwError(() => ({
      message: errorMessage,
      originalError: error
    }));
  }
}