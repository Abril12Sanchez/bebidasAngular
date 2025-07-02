import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

interface Bebida {
}

@Injectable({
  providedIn: 'root'
})
export class BebidaService {
  private readonly baseUri: string = '//http://localhost:4000/api';
  private readonly headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  agreBebida(data: Bebida): Observable<Bebida> {
    const url = `${this.baseUri}/agregar`;
    return this.http.post<Bebida>(url, data, { headers: this.headers })
      .pipe(catchError(this.errorManager));
  }

  getBebida(): Observable<Bebida[]> {
    const url = `${this.baseUri}/bebida`;
    return this.http.get<Bebida[]>(url, { headers: this.headers });
  }

  getBebida(id: string): Observable<Bebida> {
    const url = `${this.baseUri}/bebida/${id}`;
    return this.http.get<Bebida>(url, { headers: this.headers }).pipe(
      map((res: any) => res || {}),
      catchError(this.errorManager)
    );
  }

  actuBebida(id: string, data: Partial<Bebida>): Observable<Bebida> {
    const url = `${this.baseUri}/actualizar/${id}`;
    return this.http.put<Bebida>(url, data, { headers: this.headers })
      .pipe(catchError(this.errorManager));
  }

  eliBebida(id: string): Observable<any> {
    const url = `${this.baseUri}/eliminar/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .pipe(catchError(this.errorManager));
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